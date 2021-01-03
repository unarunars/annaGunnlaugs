import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  The main component for users, not admin. 
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2018
 *
 *
 **************************************************************************** */

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageBlobUrlCv = [];
  imageBlobUrlBanner = [];
  chosen: string = "home";
  show: boolean = true;
  showCv: boolean = false;
  cv = [];
  constructor(
    private connectionService : ConnectionService,
  ) { }
  //myndlist/paintings
  //grafísk hönnum/graphics-design

  ngOnInit(): void {
    this.getBanner();
    this.getCv();

  }

  goBack(){
    this.showCv =false;
  }
  goCv(){
    console.log("CV");
    this.showCv = true;
  }
  getCv(){
    this.connectionService.getCv().subscribe(
      (val) => { 
        //console.log(val);
        this.createImageFromBlobCv(val);
      },
      response => {
        console.log("POST in error", response);
      },
      () => {
        console.log("POST observable is now completed.");
      });
  }
  createImageFromBlobCv(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      //console.log(reader.result);
     console.log("#######");
    this.imageBlobUrlCv[0] = reader.result;
  }, false);   
  if (image) {
      reader.readAsDataURL(image);
    }
  }

  getBanner(){
    this.connectionService.getCover().subscribe(
      (val) => { 
        //console.log(val);
        this.createImageFromBlobBanner(val);
      },
      response => {
        console.log("POST in error", response);
      },
      () => {
        console.log("POST observable is now completed.");
      });
  }
  createImageFromBlobBanner(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {

      //console.log(reader.result);
     console.log("#######");
     
  
    this.imageBlobUrlBanner[0] = reader.result;
  }, false);   
  if (image) {
      reader.readAsDataURL(image);
    }
  }

}
