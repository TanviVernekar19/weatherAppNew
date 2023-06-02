import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cityName: string = '';
  searchResults: any = [];
  active = 'active';
  date: any;
  data:any
  sub = new Subscription
  constructor(private weatherservice:WeatherserviceService,private homeservice:HomeService,private router:Router){}

  ngOnInit(): void {
    this.date = new Date();
  }

  handleChange(event: string): void {
    if(event.length >= 3){
      this.weatherservice.searchApi(event)
      this.sub=this.weatherservice.searchObject$.subscribe((searchResults: any)=>{
        this.searchResults=searchResults;
        // console.log(searchResults)
      })
    }
  }
  handleCityClick(city: any) {
    this.weatherservice.getWeatherApi(city)
    this.searchResults = [];
    this.router.navigate([''])
    this.cityName=''
    // this.weatherservice.weatherObject$.subscribe((res)=>{
    //   this.homeservice.recentList(res)
    // })
  }
}
