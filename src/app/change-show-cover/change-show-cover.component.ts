import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectionService } from '../connection.service';

/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  This component is for changing the cover photo on the show side.
 *                Only for admins, can only go to this side if loged in and from the 
 *                admin component. 
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2020 
 *
 *
 **************************************************************************** */

@Component({
  selector: 'app-change-show-cover',
  templateUrl: './change-show-cover.component.html',
  styleUrls: ['./change-show-cover.component.css']
})
export class ChangeShowCoverComponent implements OnInit {
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
  * input the photo we are uploading
  * saves the photo trought connection service
  */
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.connectionService.updateShowCover(formData).subscribe(event => {
      console.log("___________ÖÖ_________")
      console.log(event)
      });
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
  * fetch show cover photo needed for this component
  */
  refresh(){
    this.connectionService.getShowCover().subscribe(
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

