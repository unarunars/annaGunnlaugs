import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConnectionService } from '../connection.service';

//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   The component where all the shows and maps are shown for users, 
 *                 not the admin side. User can choose show, view the photos big or small. 
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2020 
 *
 *
 **************************************************************************** */

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.css']
})
export class PaintingsComponent implements OnInit {
  chosen: string = "";
  showFullImg: boolean =  false;
  fullImgUrl: string = "";
  index: number;
  showLeft: boolean = true; 
  showRight: boolean = true;
  shows: any[] = [];
  mapId: number;
  description: string = "";
  imageBlobUrl = [];
  imageBlobUrlBanner = [];
  picturesData: any;
  noPics: boolean = false;
  isFetchingPics: boolean = false;
  tempArr: any;
  isLoading: boolean =false; 
  showDescriptionArray = [];
  title: string; 
  size: string;
  picDescription: string;
  

  constructor(
    private location: Location,
    private connectionService : ConnectionService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }
  /*
  * refresh and gets data needed for this component
  */
  refresh(){
    let maps = this.connectionService.getMaps();
    //console.log(maps);
    maps.subscribe(data => {
      console.log(data);
      this.shows = data.sort(function(a, b) {
        return a.id - b.id;
      });
    })
    this.getBanner();
  }
  /*
  * fetch banner photo needed for this component
  */
  getBanner(){
    this.connectionService.getShowCover().subscribe(
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
  /*
  * input image id
  * wheater arrows should appear next to image
  */
  checkShowButtons(index: number){
    if(index === 0){
      this.showLeft = false;
      this.showRight = true;
    }else if(index === this.imageBlobUrl.length - 1){
      this.showRight = false;
      this.showLeft = true;
    }else{
      this.showRight = true;
      this.showLeft = true;
    }
  }
  /*
  * renders to main component
  */
  goHome(){
    this.chosen = "home";
    this.location.back();
  }
  /*
  * input image id
  * show the image big
  */
  open(index: number): void{
    this.checkShowButtons(index);
    this.showFullImg = true;
    this.index = index;
    this.fullImgUrl = this.imageBlobUrl[index].url;
    this.title = this.imageBlobUrl[index].description.title;
    this.size = this.imageBlobUrl[index].description.size;
    this.picDescription = this.imageBlobUrl[index].description.description;
    this.imageBlobUrl.map(t => {
      console.log(t.image);
    })
  }
  /*
  * function for next photo button
  * fetch data for the next photo
  */
  nextImg(){
    this.index -= 1;
    this.checkShowButtons(this.index);
    this.fullImgUrl = this.imageBlobUrl[this.index].url;
    this.title = this.imageBlobUrl[this.index].description.title;
    this.size = this.imageBlobUrl[this.index].description.size;
    this.picDescription = this.imageBlobUrl[this.index].description.description;
  }
  /*
  * function for last photo button
  * fetch data for the last photo
  */
  lastImg(){
    this.index += 1;
    this.checkShowButtons(this.index);
    this.fullImgUrl =this.imageBlobUrl[this.index].url;
    this.title = this.imageBlobUrl[this.index].description.title;
    this.size = this.imageBlobUrl[this.index].description.size;
    this.picDescription = this.imageBlobUrl[this.index].description.description;
  }
  /*
  * go back to thumbnails
  */
  goBack(){
    this.showFullImg = false;
  }
  /*
  * go to shows and change format to get data needed
  */
  goToShow(index: number){
    this.mapId = this.shows[index].id;
    this.chosen = this.shows[index].name;
    this.description = this.shows[index].description;
    this.showFullImg = false;
    this.imageBlobUrl = [];
    this.isLoading = true;
    this.connectionService.getAllPicDescription(this.shows[index].id).subscribe(t => {
     
      this.showDescriptionArray = t;
    })
    this.connectionService.getFilesInfo(this.mapId)
    .subscribe(t => {
      this.tempArr = [];
      this.picturesData = t;
      this.tempArr[0] = t[0]; 
      for(let i = 1 ; i < t.length; i++){
        this.tempArr.push(t[i]);
        
      }
      this.tempArr.sort(function(a, b) {
        return a.id - b.id;
      });
      console.log(this.tempArr);
      this.tempArr.map(item => {
        this.mapThroughPics(item, this.mapId );

      })
      this.isFetchingPics = false;
    })
  }
  /*
  * input picture as object
  * input id of the show we are fetching data for
  * fetch data needed for mapping though pitures
  */
  mapThroughPics(pic , mapId){
    console.log(pic.id);
    this.connectionService.getFile(mapId, pic.id)
    .subscribe(
      (val) => { 
        this.createImageFromBlob(val, pic);
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
  * input picture as object
  * create the images ang fetch the description if any
  */
  createImageFromBlob(image: Blob, pic: any) {
    let reader = new FileReader();
    let description;
    reader.addEventListener("load", () => {
     this.showDescriptionArray.map(t => {
      if(t.photoId === pic.id){
        description = {
          "title": t.title,
          "description": t.description,
          "size": t.size,
          "photoId": t.photoId
        }
        
      }
    })
     let obj = {
       "image": pic, 
       "url": reader.result,
       "description": description
     }

      if(this.imageBlobUrl.length === 0){
        this.imageBlobUrl[0] = obj;
      }else{
        this.imageBlobUrl.push(obj);
      }
    }, false);
  if (image) {
      reader.readAsDataURL(image);
    }
  }
  
}
