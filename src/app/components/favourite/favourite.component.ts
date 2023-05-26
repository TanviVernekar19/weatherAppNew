import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit{

  favouriteList:any=[]
  // favNew: any=[]
constructor(private homeservice:HomeService){}

ngOnInit(): void {
  this.favouriteList=localStorage.getItem('favData')
  this.favouriteList=JSON.parse(this.favouriteList)
  // this.favNew=this.favouriteList
}
  
removeFavourite(weathercitydata:any){
  this.homeservice.removeFav(weathercitydata);
  this.favouriteList=localStorage.getItem('favData')
  this.favouriteList=JSON.parse(this.favouriteList)
}

navigateToHome(data:any){

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
