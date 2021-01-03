import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectionService } from '../connection.service';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  This component is for changing the cover photo on the main side.
 *                Only for admins, can only go to this side if loged in and from the 
 *                admin component. 
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2018
 *
 *
 **************************************************************************** */
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
  /*
 * Input blob data => the photo
 * Send one blob data to the connection service, witch talks to the backend.
 */
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.connectionService.updateCover(formData).subscribe(event => {
      console.log("___________ÖÖ_________")
      console.log(event)
      });
  }
  /*
 * For uploadins multible photos, maps though photos and sends to 
 * sendFile function. 
 */
  private sendFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.sendFile(file);
    });
}
/*
 * The function for "breyta mynd" button, calls sendFiles witch callse sendFile
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
 * Fetch the data we need in this component
 */
  refresh(){
    this.connectionService.getCover().subscribe(
      (val) => { 
        this.createImageFromBlob(val);
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
 * create Image
 */
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
    this.imageBlobUrl[0] = reader.result;
  }, false);   
  if (image) {
      reader.readAsDataURL(image);
    }
  }
}

