import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';
import { RemoveFavComponent } from '../remove-fav/remove-fav.component';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit{

  favouriteList:any=[]
  // favNew: any=[]
constructor(private homeservice:HomeService,private dialog:MatDialog,private weatherservice:WeatherserviceService,private router:Router){}

ngOnInit(): void {
  this.favouriteList=localStorage.getItem('favData')
  this.favouriteList=JSON.parse(this.favouriteList)
  // this.favNew=this.favouriteList
}
  
openDialog(): void {
  const dialogRef = this.dialog.open(RemoveFavComponent, {
    data: {
      clearAllFav: this.clearAllFav.bind(this),
    },
  });
}
removeFavourite(weathercitydata:any){
  this.homeservice.removeFav(weathercitydata);
  this.favouriteList=localStorage.getItem('favData')
  this.favouriteList=JSON.parse(this.favouriteList)
}
clearAllFav(){
 localStorage.removeItem('favData')
 this.favouriteList=null
}
navigateToHome(data:any){
this.weatherservice.weatherData.next(data)
this.router.navigate([''])
}
// favourite(fav:any,data:any){
//   let fav1=false
//   if(this.favouriteList){
//     this.favouriteList.map( (item:any) => {
//       if(item.location?.name === this.favouriteList.location?.name){
//        return fav1 = true
//       }
//     })
//   }
//   // if(fav){
//   //   this.favStatus=true
//   // }else{
//   //   this.favStatus=false
//   // }
// }

}
