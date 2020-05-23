import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  
  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  goHome(){
    this.location.back();

  }
}
