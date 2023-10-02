import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getMockData<T>(entity: string) {
    return this.http.get<{list: T[], total: number}>(`${this.configService.getMockPathPrefix()}/${entity}.json`)
  }
}
