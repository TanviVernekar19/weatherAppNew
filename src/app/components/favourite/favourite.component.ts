import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';
import { RemoveFavComponent } from '../remove-fav/remove-fav.component';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  favouriteList: any = [];
  constructor(
    private homeservice: HomeService,
    private dialog: MatDialog,
    private weatherservice: WeatherserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RemoveFavComponent, {
      data: {
        clearAllFav: this.clearAllFav.bind(this),
      },
    });
  }
  removeFavourite(weathercitydata: any) {
    this.homeservice.removeFav(weathercitydata);
    this.homeservice.FavList$.subscribe((res) => {
      this.favouriteList = res;
    });
  }
  clearAllFav() {
    localStorage.removeItem('favData');
    this.favouriteList = null;
    this.homeservice.FavList.next([]);
  }
  navigateToHome(data: any) {
    this.weatherservice.weatherData.next(data);
    this.router.navigate(['']);
  }
}
