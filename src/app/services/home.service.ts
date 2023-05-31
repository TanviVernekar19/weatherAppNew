import { Injectable } from '@angular/core';
import { WeatherserviceService } from './weatherservice.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  data: any = [];
  local: any = [];
  recentArray: any = [];
  recentLocal: any = [];
  favstate: any;
  
  constructor(private weatherservice: WeatherserviceService) {}

  addToFav(weathercitydata: any) {
    this.data = localStorage.getItem('favData');
    this.data = JSON.parse(this.data);
    this.favstate = localStorage.getItem('favstate');
    this.local = [];
    this.local.push(weathercitydata);
    console.log('this.local', this.local);
    if (this.data) {
      // this.data.push(weathercitydata);
      this.data.splice(0, 0, weathercitydata);

    } else {
      this.data = this.local;
    }
    localStorage.setItem('favData', JSON.stringify(this.data));
  }

  removeFav(weathercitydata: any) {
    this.data = localStorage.getItem('favData');
    this.data = JSON.parse(this.data);

    this.data.map((item: any, id: number) => {
      if (item.location?.name === weathercitydata.location?.name) {
        this.data = this.data.filter(
          (ele: any) => ele.location?.name !== item.location?.name
        );
      }
    });
    
    localStorage.setItem('favData', JSON.stringify(this.data));
  }

  recentList(recentCity: any) {
    if (recentCity?.location) {
      this.recentArray = localStorage.getItem('recentData');
      this.recentArray = JSON.parse(this.recentArray);
      let object: any = {
        favouritestate: false,
        location: recentCity?.location,
        current: recentCity?.current,
      };
      this.recentLocal = [];
      this.recentLocal.push(object);
      if (this.recentArray) {
        let recentstate = true;
        this.recentArray.map((item: any) => {
          if (item.location?.name === recentCity?.location?.name) {
            recentstate = false;
          }
        });
        if (recentstate) {
          this.recentArray.splice(0, 0, object);
          // this.recentArray.push(object);
        } else {
          this.recentArray = this.recentArray.filter(
            (ele: any) => ele.location?.name !== recentCity.location?.name
          );
          this.recentArray.splice(0, 0, object);
          // this.recentArray.push(object);
        }
      } else {
        if (recentCity?.location) {
          console.log('this.recentLocal', this.recentLocal);
          this.recentArray = this.recentLocal;
        }
      }
      if (this.recentArray.length > 6) {
        this.recentArray.pop();
      }

      localStorage.setItem('recentData', JSON.stringify(this.recentArray));
    }
  }
  updateFavList(weathercitydata: any) {
    this.data = localStorage.getItem('favData');
    this.data = JSON.parse(this.data);
    if (this.data) {
      let recentstate = false;
      this.data.map((item: any) => {
        if (item.location?.name === weathercitydata?.location?.name) {
          recentstate = true;
        }
      });
      if (recentstate) {
        let index: any;
        this.data.find((ele: any, id: number) => {
          if (ele.location?.name === weathercitydata.location?.name) index = id;
        });
        if (index == 0) {
          if (this.data.length == 1) {
            let body = [];
            body.push(weathercitydata);
            this.data = body;
          } else if (this.data.length >= 1) {
            this.data[index] = weathercitydata;
          }
        } else if (index >= 1) {
          this.data[index] = weathercitydata;
        }
      }
    }
    localStorage.setItem('favData', JSON.stringify(this.data));
  }
}
