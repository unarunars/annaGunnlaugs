import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  The main component for users, not admin. 
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2020 
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

  ngOnInit(): void {
    this.getBanner();
    this.getCv();

  }
  /*
  * not show cv
  */
  goBack(){
    this.showCv =false;
  }
  /*
  * to show the cv 
  */
  goCv(){
    this.showCv = true;
  }
  /*
  * fetch cv photo needed for this component
  */
  getCv(){
    this.connectionService.getCv().subscribe(
      (val) => { 
        this.createImageFromBlobCv(val);
      },
      response => {
        console.log("POST in error", response);
      },
      () => {
        console.log("POST observable is now completed.");
      });
  }
  /*
  * input image as Blob
  * create Image for cv
  */
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
  /*
  * fetch cover photo needed for this component
  */
  getBanner(){
    this.connectionService.getCover().subscribe(
      (val) => { 
        this.createImageFromBlobBanner(val);
      },
      response => {
        console.log("POST in error", response);
      },
      () => {
        console.log("POST observable is now completed.");
      });
  }
  /*
  * input image as Blob
  * create Image for banner
  */
  createImageFromBlobBanner(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
    this.imageBlobUrlBanner[0] = reader.result;
  }, false);   
  if (image) {
      reader.readAsDataURL(image);
    }
  }

}
