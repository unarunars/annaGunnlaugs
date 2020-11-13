import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';



@Component({
  selector: 'app-change-paintings',
  templateUrl: './change-paintings.component.html',
  styleUrls: ['./change-paintings.component.css']
})
export class ChangePaintingsComponent implements OnInit {
  dataIsReady: boolean = false;
  map: string;
  titleValues: string = "";
  descriptionValues: string = "";
  renderToShow: boolean= false;
  showTitle: string;
  showDescription: string;
  mapId: number;
  imageBlobUrl = [];
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    files  = [];

  constructor(
    private connectionService : ConnectionService
  ) { }

  ngOnInit(): void {
    console.log("Byrja");
    this.refresh();
  }
  refresh(){
    let maps = this.connectionService.getMaps();
    //console.log(maps);
    maps.subscribe(data => {
      console.log(data);
      this.map = data;
    })
  }
  
  goToShow(show: any){
    console.log("CHANGE SHOW");
    console.log(show);
    this.renderToShow = true;
    this.showTitle = show.name;
    this.showDescription = show.description;
    this.mapId = show.id;
    this.getPictures(show.id);
  }
  getPictures(mapId: any){
    //let length = 0;
    this.imageBlobUrl = [];
    this.connectionService.getFilesInfo(mapId)
    .subscribe(t => {
      console.log("##")
      console.log(t);
      console.log(t.length);
      //length: t.length;
      for(let i = 0 ; i < t.length; i++){
        this.mapThroughPics(t[i].id, mapId );
      }
    })
    
  }
  mapThroughPics(id : number, mapId){
    this.connectionService.getFile(mapId, id)
    .subscribe(
      (val) => { 
        console.log(val);
        this.createImageFromBlob(val);
        console.log("juhhu");
      },
      response => {
        console.log("POST in error", response);
      },
      () => {
        console.log("POST observable is now completed.");
      });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if(this.imageBlobUrl.length === 0){
        this.imageBlobUrl[0] = reader.result;
      }else{
        this.imageBlobUrl.push(reader.result);

      }
    }, false);
  if (image) {
      reader.readAsDataURL(image);
    }
  }
  createNewMap(){
    console.log("create new show")
    console.log(this.titleValues);
    console.log(this.descriptionValues);
    let obj = {
      "name": this.titleValues,
      "description": this.descriptionValues,
    }
    this.connectionService.postMap(obj).subscribe(data => {
      console.log(data);
      this.refresh()
    })

  }
  onKeyTitle(event: any) { // without type info
    console.log(event.target.value);
    this.titleValues = event.target.value;
    //this.values += event.target.value + ' | ';
  }
  onKeyDescription(event: any) { // without type info
    console.log(event.target.value);
    this.descriptionValues = event.target.value;
    //this.values += event.target.value + ' | ';
  }
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.connectionService.sendFormData(formData, this.mapId).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          //this.getPictures(this.mapId);
        }
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
}
