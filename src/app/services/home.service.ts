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
  localdata: any = [];

  FavList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  FavList$: Observable<any> = this.FavList.asObservable();

  RecentList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  RecentList$: Observable<any> = this.RecentList.asObservable();

  constructor(private weatherservice: WeatherserviceService) {}

  addToFav(weathercitydata: any, state: any) {
    this.FavList.subscribe((res) => {
      this.data = res;
    });
    this.local = [];
    let body;
    if (state === 'home') {
      body = {
        name: weathercitydata?.location?.name,
        region: weathercitydata?.location?.region,
        icon: weathercitydata?.current?.condition?.icon,
        temp_c: weathercitydata?.current?.temp_c,
        text: weathercitydata?.current?.condition?.text,
      };
      this.local.push(body);
      if (this.data !== null) {
        this.data.splice(0, 0, body);
      } else {
        this.data = this.local;
      }
    } else if (state === 'favList') {
      body = {
        name: weathercitydata?.name,
        region: weathercitydata?.region,
        icon: weathercitydata?.icon,
        temp_c: weathercitydata?.temp_c,
        text: weathercitydata?.text,
      };
      this.local.push(body);
      if (this.data !== null) {
        this.data.splice(0, 0, body);
      } else {
        this.data = this.local;
      }
    }
    this.FavList.next(this.data);
    localStorage.setItem('favData', JSON.stringify(this.data));
  }

  removeFav(weathercitydata: any) {
    this.FavList.subscribe((res) => {
      this.data = res;
    });
    this.data.map((item: any, id: number) => {
      if (item?.name === weathercitydata?.name) {
        this.data = this.data.filter((ele: any) => ele?.name !== item?.name);
        console.log('this.data.filter', this.data);
      }
    });
    this.FavList.next(this.data);
    localStorage.setItem('favData', JSON.stringify(this.data));
  }

  recentList(recentCity: any) {
    if (recentCity?.location) {
      this.RecentList.subscribe((res) => {
        this.recentArray = res;
      });

      let object: any = {
        favouritestate: false,
        name: recentCity?.location?.name,
        region: recentCity?.location?.region,
        icon: recentCity?.current?.condition?.icon,
        temp_c: recentCity?.current?.temp_c,
        text: recentCity?.current?.condition?.text,
      };
      this.recentLocal = [];
      this.recentLocal.push(object);
      if (this.recentArray) {
        let recentstate = true;
        this.recentArray.map((item: any) => {
          if (item?.name === recentCity?.location?.name) {
            recentstate = false;
          }
        });
        if (recentstate) {
          this.recentArray.splice(0, 0, object);
        } else {
          this.recentArray = this.recentArray.filter(
            (ele: any) => ele?.name !== recentCity.location?.name
          );
          this.recentArray.splice(0, 0, object);
        }
      } else {
        if (recentCity?.location) {
          this.recentArray = this.recentLocal;
        }
      }
      if (this.recentArray.length > 6) {
        this.recentArray.pop();
      }
      this.RecentList.next(this.recentArray);
      localStorage.setItem('recentData', JSON.stringify(this.recentArray));
    }
  }
  updateFavList(weathercitydata: any) {
    this.FavList.subscribe((res) => {
      this.data = res;
    });
    let favbody;
    favbody = {
      name: weathercitydata?.location?.name,
      region: weathercitydata?.location?.region,
      icon: weathercitydata?.current?.condition?.icon,
      temp_c: weathercitydata?.current?.temp_c,
      text: weathercitydata?.current?.condition?.text,
    };
    if (this.data) {
      let recentstate = false;
      this.data.map((item: any) => {
        if (item?.name === weathercitydata?.location?.name) {
          recentstate = true;
        }
      });
      if (recentstate) {
        let index: any;
        this.data.find((ele: any, id: number) => {
          if (ele?.name === weathercitydata.location?.name) index = id;
        });
        if (index == 0) {
          if (this.data.length == 1) {
            let body = [];
            body.push(favbody);
            this.data = body;
          } else if (this.data.length >= 1) {
            this.data[index] = favbody;
          }
        } else if (index >= 1) {
          this.data[index] = favbody;
        }
      }
    }
    this.FavList.next(this.data);
    localStorage.setItem('favData', JSON.stringify(this.data));
  }
}
