import { Injectable } from '@angular/core';
import { WeatherserviceService } from './weatherservice.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data:any=[]
  local:any=[]
  favClickData:BehaviorSubject<any>=new BehaviorSubject<any>([])
  favclickObject$:Observable<any>=this.favClickData.asObservable();
  constructor(private weatherservice:WeatherserviceService) { }

  addToFav(weathercitydata:any){
    this.data=localStorage.getItem('favData');
    this.data=JSON.parse(this.data)
    //  this.weatherservice.weatherObject$.subscribe((res)=>{
    //  const details = res
    // weathercitydata={
    //   favourite:true,
    //   details:weathercitydata.res,
    // };
    // console.log('wea')
    // // this.favClickData(weathercitydata).subscribe
    // })
    this.local=[]
    this.local.push(weathercitydata)
    if(this.data){
      this.data.push(weathercitydata)
      console.log(this.data)
    } else{
      this.data=this.local
    }
    localStorage.setItem('favData',JSON.stringify(this.data))

  }

  removeFav(weathercitydata:any){
    this.data=localStorage.getItem('favData');
    this.data=JSON.parse(this.data)
    this.data.map((item:any,id:number) => {
      if(item.location?.name === weathercitydata.location?.name){
        this.data=this.data.filter((ele:any)=> ele.location?.name !== item.location?.name)
      }
    })

    localStorage.setItem('favData',JSON.stringify(this.data))
  }

}
