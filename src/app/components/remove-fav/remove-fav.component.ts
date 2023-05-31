import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-fav',
  templateUrl: './remove-fav.component.html',
  styleUrls: ['./remove-fav.component.css']
})
export class RemoveFavComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
  }



}
