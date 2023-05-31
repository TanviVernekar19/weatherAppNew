import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-recent',
  templateUrl: './remove-recent.component.html',
  styleUrls: ['./remove-recent.component.css']
})
export class RemoveRecentComponent implements OnInit
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(){}

}
