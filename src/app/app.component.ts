import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from './services/weatherservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weatherAppNew';
  constructor(private weatherservice:WeatherserviceService){}
  
    ngOnInit(){
    this.weatherservice.getWeatherApi('udupi')
  }
   
}
