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
  // favouritestate:boolean=false
  // location:any;
  // current:any;
  // favClickData:BehaviorSubject<any>=new BehaviorSubject<any>([])
  // favclickObject$:Observable<any>=this.favClickData.asObservable();
  constructor(private weatherservice: WeatherserviceService) {}

  addToFav(weathercitydata: any) {
    this.data = localStorage.getItem('favData');
    this.data = JSON.parse(this.data);
    this.favstate = localStorage.getItem('favstate');

    // this.favstatus = localStorage.getItem('favstatus')
    // console.log('this.data', this.data);
    //  this.weatherservice.weatherObject$.subscribe((res)=>{
    //  const details = res
    // weathercitydata={
    //   favourite:true,
    //   details:weathercitydata.res,
    // };
    // console.log('wea')
    // // this.favClickData(weathercitydata).subscribe
    // })
    this.local = [];
    this.local.push(weathercitydata);
    console.log('this.local', this.local);
    if (this.data) {
      this.data.push(weathercitydata);
      // console.log(this.data)
    } else {
      this.data = this.local;
    }
    localStorage.setItem('favData', JSON.stringify(this.data));
    localStorage.setItem('favstate', JSON.stringify(true));
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
          this.recentArray.push(object);
        }
      } else {
        if (recentCity?.location) {
          console.log('this.recentLocal', this.recentLocal);
          this.recentArray = this.recentLocal;
        }
      }
      console.log('this.recentArray', this.recentArray);
      localStorage.setItem('recentData', JSON.stringify(this.recentArray));
    }
  }
  removeFav(weathercitydata: any) {
    this.data = localStorage.getItem('favData');
    this.data = JSON.parse(this.data);
    this.favstate = localStorage.getItem('favstate');

    this.data.map((item: any, id: number) => {
      if (item.location?.name === weathercitydata.location?.name) {
        this.data = this.data.filter(
          (ele: any) => ele.location?.name !== item.location?.name
        );
      }
    });
    localStorage.setItem('favData', JSON.stringify(this.data));
    localStorage.setItem('favstate', JSON.stringify(false));
  }
}
