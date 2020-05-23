import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  chosen: string = "home";
  show: boolean = true;
  showCv: boolean = false;
  constructor() { }
  //myndlist/paintings
  //grafísk hönnum/graphics-design

  ngOnInit(): void {

  }

  goBack(){
    this.showCv =false;
  }
  goCv(){
    console.log("CV");
    this.showCv = true;
  }

}
