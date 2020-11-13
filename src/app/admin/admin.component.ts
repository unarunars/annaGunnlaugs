import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  changePaintings: boolean = false;
  changeCv: boolean = false;
  showAdmin: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  goChangePaintings(){
    console.log("já");
    this.changePaintings = true;
    this.showAdmin = false;
  }
  goChangeCv(){
    this.changeCv = true;
    this.showAdmin = false;
  }
}
