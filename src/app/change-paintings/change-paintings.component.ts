import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';
import {MatDialog} from '@angular/material/dialog';

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
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    files  = [];

  constructor(
    private connectionService : ConnectionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("Byrja");
    this.refresh();
  }
 
  refresh(){
    let maps = this.connectionService.getMaps();
    //console.log(maps);
    maps.subscribe(data => {
     // console.log(data);
      this.map = data;
      return true;
    })
    
  }
  refreshButton(){
    this.getPictures(this.mapId);
  }
  goToShow(index: number){
    //console.log("CHANGE SHOW");
    //console.log(this.map[index]);
    this.renderToShow = true;
    this.showTitle = this.map[index].name;
    this.showDescription = this.map[index].description;
    this.mapId = this.map[index].id;
    this.descriptionValues = "",
    this.titleValues = "";
    this.getPictures(this.map[index].id);
    this.connectionService.getAllPicDescription(this.map[index].id).subscribe(t => {
      console.log("jess");
      console.log(t);
      this.showDescriptionArray = t;
    })
  }
  deleteShow(show: any){
    console.log(show);
    this.connectionService.getFilesInfo(show.id)
    .subscribe(t => {
      console.log(t.length);
      if(t.length === 0){
        this.connectionService.deleteShow(show.id)
        .subscribe(data => {
          console.log(data);
        })
      }else{
        this.dialog.open(DialogElementsExampleDialog);
      }
    })
  }
  getPictures(mapId){
    //let length = 0;
    
   // console.log("mapId : ", this.mapId);
    this.isFetchingPics = true;
    let tempArr: any = [];
    this.imageBlobUrl = [];
    this.connectionService.getFilesInfo(mapId)
    .subscribe(t => {
     // console.log("##")
     // console.log(t);
      //console.log(t.length);
      //length: t.length;
      this.tempArr = [];
      this.picturesData = t;
      this.tempArr[0] = t[0]; 
      for(let i = 1 ; i < t.length; i++){
        this.tempArr.push(t[i]);
        
      }
      
      
     // console.log(this.tempArr);
      //this.tempArr.sort();
      this.tempArr.sort(function(a, b) {
        return a.id - b.id;
      });
     // console.log(this.tempArr);
      this.tempArr.map(item => {

        this.mapThroughPics(item, this.mapId );

      })
      this.isFetchingPics = false;
    })
  }
  mapThroughPics(pic , mapId){
    //console.log(pic.id);
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
  createImageFromBlob(image: Blob, pic: any) {
    let reader = new FileReader();
    let description;
    reader.addEventListener("load", () => {
      this.showDescriptionArray.map(t => {
        //console.log(t);
        //console.log(pic);
        if(t.photoId === pic.id){
          //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          description = {
            "title": t.title,
            "description": t.description,
            "size": t.size,
            "photoId": t.photoId
          }
          
        }
      })
      //console.log(reader.result);
    // console.log("#######");
     let obj = {
      "image": pic, 
      "url": reader.result,
      "description" : description
     }
     

     //console.log("halló? ");
     //console.log(obj);
      if(this.imageBlobUrl.length === 0){
        this.imageBlobUrl[0] = obj;
      }else{
        this.imageBlobUrl.push(obj);
      }
      //this.isFetchingPics = 
    }, false);
  if (image) {
      reader.readAsDataURL(image);
    }
  }
  createNewMap(){
    //console.log("create new show")
    //console.log(this.titleValues);
    //console.log(this.descriptionValues);
    let obj = {
      "name": this.titleValues,
      "description": this.descriptionValues,
    }
    this.connectionService.postMap(obj).subscribe(data => {
      console.log(data);
      this.refresh()
    })
  }
  deletePic(pic: any){
    //console.log(pic);
   // console.log(this.picturesData[index])
    //console.log(this.imageBlobUrl);
    //console.log(this.mapId);
  //una einhvað skrýtið hér!
  if(!this.mapId){
    return ;
  }else{

     this.connectionService.deletePic(this.mapId, pic).subscribe( data => {
     // console.log(data)
     // console.log(this.mapId);
      this.getPictures(this.mapId);

    })
  }
   
  }
  createPicDescription(index: number){
    //console.log(index);
  console.log(this.picturesData[index])
  console.log(this.imageBlobUrl[index].id);
   /* title: req.body.title,
    description: req.body.description,
    size: req.body.size,
    photoId: req.body.photoId,
    mapId: req.body.mapId,*/
    let obj = {
      "title" : this.titleValues,
      "description": this.descriptionValues,
      "size": this.sizeValues,
      "photoId": this.picturesData[index].id,
      "mapId": this.mapId,
    }
   console.log(obj);
   // console.log(index);
   /* this.connectionService.postPicDescription(obj).subscribe(data => {
      console.log(data);
    })*/
  }
  onKeyTitle(event: any) { // without type info
   // console.log(event.target.value);
    this.titleValues = event.target.value;
    //this.values += event.target.value + ' | ';
  }
  onKeyDescription(event: any) { // without type info
    //console.log(event.target.value);
    this.descriptionValues = event.target.value;
    //this.values += event.target.value + ' | ';
  }
  onKeySize(event: any) { // without type info
  //  console.log(event.target.value);
    this.sizeValues = event.target.value;
    //this.values += event.target.value + ' | ';
  }
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.connectionService.sendFormData(formData, this.mapId).subscribe(event => {
      console.log("___________ÖÖ_________")
      console.log(event)
      });
  }
  private sendFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.sendFile(file);
    });
}
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
  goBack(){
    this.renderToShow = !this.renderToShow;
    this.noPics = false;
  }
  
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
