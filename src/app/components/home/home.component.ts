import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  temp: string = 'Celcius';
  weathercitydata:any=[];
  favouriteList:any=[]
  favStatus:boolean=false
  constructor(private weatherService:WeatherserviceService,private homeservice:HomeService){}
  ngOnInit():void{
    this.weatherDetails()

  }

  weatherDetails(){
    this.weatherService.weatherObject$.subscribe((res)=>{
      this.weathercitydata=res;
      console.log("home",this.weathercitydata)
      this.favouriteList=localStorage.getItem('favData')
      this.favouriteList=JSON.parse(this.favouriteList)
      this.favourite()
    })
  }
 
  addToFavourite(weathercitydata:any){
  this.homeservice.addToFav(weathercitydata);
  this.favouriteList=localStorage.getItem('favData')
  this.favouriteList=JSON.parse(this.favouriteList)
  this.favourite()
  }
  removeFavourite(weathercitydata:any){
    this.homeservice.removeFav(weathercitydata);
    this.favouriteList=localStorage.getItem('favData')
    this.favouriteList=JSON.parse(this.favouriteList)
    this.favourite()
 }

  convertToFahreneit() {
    this.temp = 'Fahreneit';
  }
  convertToCelcius() {
    this.temp = 'Celcius';
  }
  favourite(){
    let fav=false
    if(this.favouriteList){
      this.favouriteList.map((item:any)=>{
        if(item.location?.name === this.weathercitydata.location?.name){
          fav = true
        }
      })
    }
    if(fav){
      this.favStatus=true
    }else{
      this.favStatus=false
    }
  }
}
