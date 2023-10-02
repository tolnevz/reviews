import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Post, Review, SelectData } from '../models';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private _httpClient: HttpClient,
    private _mockService: MockService,
  ) {}

  getReviews() {
    return this._mockService.getMockData<Review>('reviews');
  }
  getBrands() {
    return this._mockService.getMockData<SelectData>('brands').pipe(
      map((data) => {
        data.list.unshift({ id: '', label: 'Выберите бренд авто' });
        return data;
      }),
    );
  }

  private _requestGet<T>(url: string, params: Record<string, any> = {}) {
    return this._httpClient.get<T>(`https://jsonplaceholder.typicode.com/${url}`, { params });
  }
  private _requestPost<T>(url: string, params: Record<string, any> = {}) {
    return this._httpClient.post<T>(`https://jsonplaceholder.typicode.com/${url}`, { params });
  }
}
