import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, forkJoin, takeUntil } from 'rxjs';
import { Review, SelectData } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  selectedReview: Review | undefined;
  total: number | null = null;
  types: SelectData[] = [
    { label: 'Выберите тип отзывов', id: '' },
    { label: 'Дилер', id: 'dealer' },
    { label: 'Авто', id: 'car' },
  ];
  selectedType: string = 'dealer';
  brands: SelectData[] = [];
  selectedBrand: string = '';

  private readonly _componentDestroyed$ = new ReplaySubject<void>(1);

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    forkJoin([this.httpService.getReviews(), this.httpService.getBrands()])
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe(([reviews, brands]) => {
        this.reviews = reviews.list;
        this.filteredReviews = this.reviews.filter((r) => r.type === this.selectedType);
        this.selectedReview = this.filteredReviews[0];
        this.total = reviews.total;
        this.brands = brands.list;
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  onSelectReview(review: Review) {
    this.selectedReview = review;
  }

  onChangeSelectedType(value: string) {
    if (!value) {
      this.filteredReviews = [];
    }
    this.selectedReview = undefined;
    this.selectedType = value;
    this.filteredReviews = this.reviews.filter((r) => {
      return this.selectedBrand ? r.type === this.selectedType && r.brandId === this.selectedBrand : r.type === this.selectedType;
    });
  }
  onChangeSelectedBrand(value: string) {
    if (!this.selectedType) return;
    if (!value) {
      this.filteredReviews = this.reviews.filter((r) => r.type === this.selectedType);
      return;
    }
    this.selectedReview = undefined;
    this.selectedBrand = value;
    this.filteredReviews = this.reviews.filter((r) => r.type === this.selectedType && r.brandId === this.selectedBrand);
  }
}
