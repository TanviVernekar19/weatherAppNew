import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  temp: string = 'Celcius';
  weathercitydata: any = [];
  favouriteList: any = [];
  favStatus: boolean = false;
  favstate: any;
  constructor(
    private weatherService: WeatherserviceService,
    private homeservice: HomeService
  ) {}
  ngOnInit(): void {
    this.weatherDetails();
  }

  weatherDetails() {
    this.weatherService.weatherObject$.subscribe((res) => {
      this.weathercitydata = res;
      console.log(res)
      this.homeservice.FavList$.subscribe((res) => {
        this.favouriteList = res;
        this.favourite();
      });
      if (this.weathercitydata) {
        this.homeservice.recentList(this.weathercitydata);
        this.homeservice.updateFavList(this.weathercitydata);
      }
    });
  }

  addToFavourite(weathercitydata: any) {
    this.homeservice.addToFav(weathercitydata,"home");
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;
      this.favourite();
    });
  }
  removeFavourite(weathercitydata: any) {
    this.homeservice.removeFav(weathercitydata);
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;
      this.favourite();
    });
  }

  convertToFahreneit() {
    this.temp = 'Fahreneit';
  }
  convertToCelcius() {
    this.temp = 'Celcius';
  }
  favourite() {
    let fav = false;
    if (this.favouriteList) {
      this.favouriteList.map((item: any) => {
        if (item?.name === this.weathercitydata.location?.name) {
          fav = true;
        }
      });
    }
    if (fav) {
      this.favStatus = true;
    } else {
      this.favStatus = false;
    }
  }

  recentData(weathercity: any) {
    this.homeservice.recentList(weathercity);
  }
}
