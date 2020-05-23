import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.css']
})
export class PaintingsComponent implements OnInit {
 // items: GalleryItem[];
 _albums: any[]= [];
  chosen: string = "";
  is2019: boolean = false;
  is1981: boolean = false;
  is1987:boolean = false; 
  showFullImg: boolean =  false;
  fullImgUrl: string = "";
  index: number;
  showLeft: boolean = true; 
  showRight: boolean = true;
  

  constructor(
    private location: Location,
    private lightbox: Lightbox,
  ) {}

  ngOnInit(): void {
   
  }
  checkShowButtons(index: number){
    if(index === 0){
      this.showLeft = false;
      this.showRight = true;
    }else if(index === this._albums.length - 1){
      this.showRight = false;
      this.showLeft = true;
    }else{
      this.showRight = true;
      this.showLeft = true;
    }
  }

  goHome(){
    this.chosen = "home";
    this.location.back();
  }
  
  open(index: number): void{
    this.checkShowButtons(index);
    this.showFullImg = true;
    this.index = index;
    this.fullImgUrl = this._albums[index].src;
    //'../../assets/img/2019Umhverfing/2019Umhverfing'+ index +'.jpg'
    console.log("jáaa", index);
  }
  nextImg(){
    this.index -= 1;
    this.checkShowButtons(this.index);
    this.fullImgUrl = this._albums[this.index].src;
  }
  lastImg(){
    this.index += 1;
    this.checkShowButtons(this.index);
    this.fullImgUrl = this._albums[this.index].src;
  }
  goBack(){
    this.showFullImg = false;
  }
  go2019(){
    this.chosen = "2019 / nr.3 Umhverfing / Snæfellsnes";

    console.log("halló??");
    this._albums = [];
    this.showFullImg = false;

    for(let i = 0; i< 20; i++){
      const src = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const caption = 'Image '+ i + 'caption';
      const thumb = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }
  go1980(){
    console.log("halló??");
    this.chosen = "1981 / Gallerí Djúpið";
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 2; i++){
      const src = '../../assets/img/1981_djupid/1981djupid'+ i +'.jpg';
      const caption = 'Image '+ i + 'caption';
      const thumb = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }
  go1987(){
    this.chosen = "1987 / Gallerí Borg";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 7; i++){
      const src = '../../assets/img/1987_7dagar/dagur'+ i +'.jpg';
      const caption = 'Image '+ i + 'caption';
      const thumb = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }
  go2009(){
    this.chosen = "2009 / Gallerí Hornið / Fórnminjar framtíðar";

    this.showFullImg = false;
    this._albums = []
    for(let i = 0; i < 8; i++){
      const src = '../../assets/img/2009Fornminjar_framtíðar/2009Fornm'+ i +'.jpg';
      const caption = 'Image '+ i + 'caption';
      const thumb = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }
  go2018(){
    this.chosen = "2018 / Listamessa / Korpúlfstaðir";

    this.showFullImg =false;
    this._albums = [];
    for(let i = 1; i < 3; i++){
      const src = '../../assets/img/2018Listamessa/2018Listamessa'+ i +'.jpg';
      const caption = 'Image '+ i + 'caption';
      const thumb = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }
  go2004(){
    this.chosen = "2004 / Sauðfé í olíu / Listhús Reykjavíkur";

    this.showFullImg =false;
    this._albums = [];
    for(let i = 0; i < 9; i++){
      const src = '../../assets/img/2004saudfe/2004saudfe'+ i +'.jpg';
      const caption = 'Image '+ i + 'caption';
      const thumb = '../../assets/img/2019Umhverfing/2019Umhverfing'+ i +'.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }
  

}
