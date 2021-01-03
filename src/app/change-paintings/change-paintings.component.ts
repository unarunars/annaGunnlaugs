import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';
import {MatDialog} from '@angular/material/dialog';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  This component is for admins to change shows and upload photos in them.
 *                First all the shows comes up and can change them or delete. When you
 *                choose show you can upload photos to that show.
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2020 
 *
 *
 **************************************************************************** */
@Component({
  selector: 'app-change-paintings',
  templateUrl: './change-paintings.component.html',
  styleUrls: ['./change-paintings.component.css']
})
export class ChangePaintingsComponent implements OnInit {
  dataIsReady: boolean = false;
  map: any;
  titleValues: string = "";
  descriptionValues: string = "";
  sizeValues: string = "";
  renderToShow: boolean= false;
  showTitle: string;
  showDescription: string;
  mapId: number;
  imageBlobUrl = [];
  picturesData: any;
  noPics: boolean = false;
  isFetchingPics: boolean = false;
  tempArr: any;
  showDescriptionArray = [];
  isChangingShow: boolean = false; 
  selectedShow: any;
  isChangeindDescription: boolean = false;
  selectedImage: any;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    files  = [];

  constructor(
    private connectionService : ConnectionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refresh();
  }
 /*
 * fetch the shows from connection service
 * and sort it by id
 */
  refresh(){
    let maps = this.connectionService.getMaps();
    maps.subscribe(data => {
      this.map= data.sort(function(a, b) {
        return a.id - b.id;
      });
      
    })
    
  }
/*
 * fetch the data, function for refresh button. 
 */
  refreshButton(){
    this.getDescription();
    this.getPictures(this.mapId);
  }
  /*
 * input index of map array
 * render to the show selected
 * fetches all data for selected show
 */
  goToShow(index: number){
    console.log("CHANGE SHOW");
    console.log(this.map[index]);
    this.renderToShow = true;
    this.showTitle = this.map[index].name;
    this.showDescription = this.map[index].description;
    this.mapId = this.map[index].id;
    this.descriptionValues = "",
    this.titleValues = "";
    this.getPictures(this.map[index].id);
    this.getDescription();
  }
  /*
 * fetch descriptions from connection service
 */
  getDescription(){
    this.connectionService.getAllPicDescription(this.mapId).subscribe(t => {
      console.log("jess");
      console.log(t);
      this.showDescriptionArray = t;
    })
  }
  /*
 * input show as object
 * gets file info from show id to check if the show is empty
 * if not delete the show otherwise dilaog pops up
 */
  deleteShow(show: any){
    console.log(show);
    this.connectionService.getFilesInfo(show.id)
    .subscribe(t => {
      if(t.length === 0){
        this.connectionService.deleteShow(show.id)
        .subscribe(data => {
          this.refresh();
        })
      }else{
        this.dialog.open(DialogElementsExampleDialog);
      }
    })
  }
  /*
 * input show as object. 
 * function for progress bar
 */
  changeShow(show){
    this.selectedShow = show;
    this.isChangingShow = true; 
  }
  /*
 * input show as object
 * updates the show though connection service
 */
  updateMap(show){
    this.isChangeindDescription = false;
    this.selectedShow =undefined;
    let obj = {
      "name": this.titleValues,
      "description": this.descriptionValues,
    }
    this.connectionService.updateMap(obj, show.id).subscribe(t => {
      this.refresh();
    })
  }
  /*
 * cancel changing the show
 */
  cancelUpdateMap(){
    this.isChangingShow = false;
    this.selectedShow = undefined;
  }
  /*
 * input mapId 
 * get pictures from the show through connection service.
 * sort it by id
 */
  getPictures(mapId){
    this.noPics = false;
    this.isFetchingPics = true;
    let tempArr: any = [];
    this.imageBlobUrl = [];
    this.connectionService.getFilesInfo(mapId)
    .subscribe(t => {
      if(t.length !== 0 ){
        this.tempArr = [];
      this.picturesData = t;
      this.tempArr[0] = t[0]; 
      for(let i = 1 ; i < t.length; i++){
        this.tempArr.push(t[i]);
      }
      
      this.tempArr.sort(function(a, b) {
        return a.id - b.id;
      });
      this.tempArr.map(item => {

        this.mapThroughPics(item, this.mapId );

      })
      this.isFetchingPics = false;
      }else{
        this.isFetchingPics = false;
        this.noPics = true;
      }
      
    })
  }
  /*
 * input pic as object, mapId the id of the show.
 * map though pictures trough connection service
 */
  mapThroughPics(pic , mapId){
    //console.log(pic.id);
    if(!pic.id){
      console.log("ætti að fara hingað?");
      return ; 
    }
    this.connectionService.getFile(mapId, pic.id)
    .subscribe(
      (val) => { 
        //console.log(val);
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
 * input image as blob, pic as object.
 * creates image from blob data
 * and fetch descriptions of the photo
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
      "description" : description
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
  /*
 * creates new show trough connection service
 */
  createNewMap(){
    let obj = {
      "name": this.titleValues,
      "description": this.descriptionValues,
    }
    this.connectionService.postMap(obj).subscribe(data => {
      console.log(data);
      this.refresh()
    })
  }
  /*
 * creates new show through connection service
 */
  deletePic(pic: any){
    if(!this.mapId){
      return ;
    }else{
      this.connectionService.deletePic(this.mapId, pic.id).subscribe( data => {
        this.getPictures(this.mapId);
      })
    }
  }
  /*
  * input id of the photo 
  * deletes description of picture through connection service
  */
  deletePicDescription(id: number){
    
    this.connectionService.deleteDescription(this.mapId, id).subscribe( t=> {
      this.refreshButton();
      
    })
  }
  /*
  * input image as object 
  * to show the input for that image
  */
  updatePicDescription(image: any){
    this.isChangeindDescription = true;
    this.selectedImage = image;
  }
  /*
  * input id of the photo that is updating 
  * updates the description though connection service
  */
  confirmUpdateDescrption(photoId: number){
    this.isChangeindDescription = false;
    this.selectedImage = undefined;
    let obj = {
      "title" : this.titleValues,
      "description": this.descriptionValues,
      "size": this.sizeValues,
      "photoId": photoId,
      "mapId": this.mapId,
    }
    this.connectionService.updateDescription(this.mapId, photoId, obj).subscribe(t => {
      console.log(t);
      this.refreshButton();
    })
  }
  /*
  * input image as object 
  * create description for picture
  */
  createPicDescription(image: any){
  console.log(image)
    let obj = {
      "title" : this.titleValues,
      "description": this.descriptionValues,
      "size": this.sizeValues,
      "photoId": image.id,
      "mapId": this.mapId,
    }
   console.log(obj);
    this.connectionService.postPicDescription(obj).subscribe(data => {
      console.log(data);
      this.refreshButton();
    })
  }
  /*
  * input key up event
  * saves the value to global varibale
  */
  onKeyTitle(event: any) { 
    this.titleValues = event.target.value;
  }
  /*
  * input key up event
  * saves the value to global varibale
  */
  onKeyDescription(event: any) { 
    this.descriptionValues = event.target.value;
  }
  /*
  * input key up event
  * saves the value to global varibale
  */
  onKeySize(event: any) { 
    this.sizeValues = event.target.value;
  }
  /*
  * input the photo we are uploading
  * saves the photo trought connection service
  */
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.connectionService.sendFormData(formData, this.mapId).subscribe(event => {} );
  }
  /*
  * if many photos are choosen we map trought them
  */
  private sendFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.sendFile(file);
    });
}
  /*
  * get the photo in right format and send the data
  */
  submitFile() {
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
    for (let index = 0; index < fileUpload.files.length; index++)
    {
     const file = fileUpload.files[index];
     this.files.push({ data: file, inProgress: false, progress: 0});
    }
      this.sendFiles();
    };
    fileUpload.click();
}
  /*
  * go back to show
  */  
  goBack(){
    this.renderToShow = !this.renderToShow;
    this.noPics = false;
  }
  
}
/*
* Dialog html component
*/
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
