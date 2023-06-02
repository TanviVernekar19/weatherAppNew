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
    // this.recentCities = localStorage.getItem('recentData');
    // this.recentCities = JSON.parse(this.recentCities);

    this.homeservice.RecentList$.subscribe((res) => {
      this.recentCities = res;
    });
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;

    });
    this.recentState();

    // this.favouriteList = localStorage.getItem('favData');
    // this.favouriteList = JSON.parse(this.favouriteList);
  }

  recentState() {
    this.recentCities.map((item: any, id: number) => {
      if (this.favouriteList) {
        let state = false
        this.favouriteList.map((ele: any) => {
          if (item.location?.name === ele.location?.name) {
            state = true
          } 
        });
        if (state){
          this.recentCities[id].favouritestate = true;
        } else {
          this.recentCities[id].favouritestate = false;
        }
      } else {
        item.favouritestate = false;
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RemoveRecentComponent, {
      data: {
        clearAllRecent: this.clearAllRecent.bind(this),
      },
    });
  }
  addToFavouriteRecent(weathercitydata: any) {
    this.homeservice.addToFav(weathercitydata);
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;
      this.recentState();
    });
  }

  removeFromFavouriteRecent(weathercitydata: any) {
    this.homeservice.removeFav(weathercitydata);
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;
    });
    this.recentCities?.map((item: any, id: number) => {
      if (item.location?.name === weathercitydata.location?.name) {
        this.recentCities[id].favouritestate = false;
        // console.log("false fav null",id,  this.recentCities[id])
      }
    });

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
