import { Component, Input } from '@angular/core';
import { Review } from 'src/app/models';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss'],
})
export class ReviewDetailComponent {
  @Input() selectedReview!: Review | undefined;
}
