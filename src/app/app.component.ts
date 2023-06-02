import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from './services/weatherservice.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weatherAppNew';
   FavLists :any= []
   RecentLists:any=[]
  constructor(private weatherservice:WeatherserviceService,private homeservice:HomeService){}
  
    ngOnInit(){
    this.weatherservice.getWeatherApi('udupi')
    const Favarray = localStorage.getItem('favData')
    const Recentarray = localStorage.getItem('recentData')
    if(Favarray !== null){
      this.FavLists =JSON.parse(Favarray)
      
      this.homeservice.FavList.next(this.FavLists)
    }else{
      this.homeservice.FavList.next([])
    }

    if(Recentarray !== null){
      this.RecentLists =JSON.parse(Recentarray)
      this.homeservice.RecentList.next(this.RecentLists)
    }else{
      this.homeservice.RecentList.next([])
    }
  }
   
}
