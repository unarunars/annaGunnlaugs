import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-change-cover',
  templateUrl: './change-cover.component.html',
  styleUrls: ['./change-cover.component.css']
})
export class ChangeCoverComponent implements OnInit {
  imageBlobUrl = [];
  
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    files  = [];
  constructor(
    private connectionService : ConnectionService,
  
  ) { }

  ngOnInit(): void {
    this.refresh();
  }
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.connectionService.updateCover(formData).subscribe(event => {
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
  refresh(){
    this.connectionService.getCover().subscribe(
      (val) => { 
        //console.log(val);
        this.createImageFromBlob(val);
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

      //console.log(reader.result);
     console.log("#######");
     
  
    this.imageBlobUrl[0] = reader.result;
  }, false);   
  if (image) {
      reader.readAsDataURL(image);
    }
  }
  goBack(){
    console.log("todo go back");

  }
  

}

