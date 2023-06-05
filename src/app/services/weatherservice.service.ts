import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherserviceService implements OnInit {
  error = new Subject<string>();
  weatherData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  weatherObject$: Observable<any> = this.weatherData.asObservable();

  searchData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  searchObject$: Observable<any> = this.searchData.asObservable();
  url = environment.API_URL;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getWeatherApi(city: string) {
    this.http.get(`${this.url}current.json?q=${city}`).subscribe((response) => {
      this.weatherData.next(response);
    }),
      (error: any) => {
        this.error.next(error.message);
      };
  }

  searchApi(text: string) {
    this.http.get(`${this.url}search.json?q=${text}`).subscribe((response) => {
      this.searchData.next(response);
    }),
      (error: any) => {
        this.error.next(error.message);
      };
  }
}
