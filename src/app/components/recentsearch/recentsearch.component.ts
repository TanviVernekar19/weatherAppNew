import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';

@Component({
  selector: 'app-recentsearch',
  templateUrl: './recentsearch.component.html',
  styleUrls: ['./recentsearch.component.css']
})
export class RecentsearchComponent implements OnInit{


  weathercitydata:any=[]
  favouriteList:any=[]
  recentList:any=[]
  recentCities:any=[]
  favstate:any
  recentFav:any;

  constructor(private weatherservive:WeatherserviceService){}
  ngOnInit(): void {
    this.recentCities=localStorage.getItem('recentData')
    this.recentCities = JSON.parse(this.recentCities);
    this.favouriteList=localStorage.getItem('favData')
    this.favouriteList=JSON.parse(this.favouriteList)
    this.favstate=localStorage.getItem('favstate')

    this.recentState()
  }

  // weatherDetails(){
  //   this.weatherservive.weatherObject$.subscribe((res)=>{
  //     this.weathercitydata=res;
  //     console.log("home",this.weathercitydata)
  //     this.favouriteList=localStorage.getItem('favData')
  //     this.favouriteList=JSON.parse(this.favouriteList)
  //     // this.favourite()
  //     // this.recents()
    
  //   })
  // }

  // recents(){
  //   if(this.favouriteList){
  //     let recentState=false
  //     this.favouriteList.map((item:any)=>{
  //       if(this.weathercitydata?.location?.name === item.location?.name){
  //         recentState=true
  //       }
  //     })
  //     if(recentState){
  //       this.recentList.push(this.weathercitydata)
  //       console.log('matchfav',this.recentCities)
  //       localStorage.setItem('recentData',JSON.stringify(this.recentList))
  //       console.log('match')
  //     }else{
  //       this.recentList.push(this.weathercitydata)
  //         console.log('nomatchfav',this.recentCities)
  //         localStorage.setItem('recentData',JSON.stringify(this.recentList))
  //         console.log('no match')
  //     }
  //   }
  //   this.recentList.push(this.weathercitydata)
  //   console.log('outside',this.recentList)
  //   localStorage.setItem('recentData',JSON.stringify(this.recentList))
  // }


  recentState(){
    this.recentCities.map((item:any,id:number)=>{
      if(this.favouriteList){
        this.favouriteList.map((ele:any)=>{
          if(item.location?.name === ele.location?.name){
            // item?.favouritestate=true;
            // console.log(`this.recentCities[${id}].favouritestate`,this.recentCities[id].favouritestate)
            this.recentCities[id].favouritestate=true
          }
        })
      }
    })
    console.log("this.recentCities",this.recentCities)

  }
}
