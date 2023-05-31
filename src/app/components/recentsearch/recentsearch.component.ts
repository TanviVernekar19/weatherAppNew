import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { RemoveRecentComponent } from '../remove-recent/remove-recent.component';

@Component({
  selector: 'app-recentsearch',
  templateUrl: './recentsearch.component.html',
  styleUrls: ['./recentsearch.component.css'],
})
export class RecentsearchComponent implements OnInit {
  weathercitydata: any = [];
  favouriteList: any = [];
  recentList: any = [];
  recentCities: any = [];
  favstate: any;
  recentFav: any;

  constructor(
    private weatherservive: WeatherserviceService,
    private homeservice: HomeService,
    private weatherservice: WeatherserviceService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.recentCities = localStorage.getItem('recentData');
    this.recentCities = JSON.parse(this.recentCities);
    this.favouriteList = localStorage.getItem('favData');
    this.favouriteList = JSON.parse(this.favouriteList);
    // this.favstate=localStorage.getItem('favstate')
    this.recentState();
  }

  recentState() {
    this.recentCities.map((item: any, id: number) => {
      if (this.favouriteList) {
        this.favouriteList.map((ele: any) => {
          if (item.location?.name === ele.location?.name) {
            // item?.favouritestate=true;
            // console.log(`this.recentCities[${id}].favouritestate`,this.recentCities[id].favouritestate)
            this.recentCities[id].favouritestate = true;
          }
        });
      }
    });
    console.log('this.recentCities', this.recentCities);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RemoveRecentComponent, {
      data: {
        clearAllRecent: this.clearAllRecent.bind(this),
      },
    });
  }
  addToFavouriteRecent(weathercitydata: any) {
    weathercitydata.favouritestate = true;
    this.homeservice.addToFav(weathercitydata);
  }

  removeFromFavouriteRecent(weathercitydata: any) {
    weathercitydata.favouritestate = false;
    this.homeservice.removeFav(weathercitydata);
  }

  navigateToHome(data: any) {
    this.weatherservice.weatherData.next(data);
    this.router.navigate(['']);
  }

  clearAllRecent() {
    localStorage.removeItem('recentData');
    this.recentCities = null;
  }
}
