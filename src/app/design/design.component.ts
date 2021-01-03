import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  Small component to show the CV.
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2018
 *
 *
 **************************************************************************** */

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
