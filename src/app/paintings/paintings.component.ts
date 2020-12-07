import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConnectionService } from '../connection.service';

//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';



@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.css']
})
export class PaintingsComponent implements OnInit {
 // items: GalleryItem[];
 //_albums: any[]= [];
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
  

  constructor(
    private location: Location,
    private connectionService : ConnectionService

    //private lightbox: Lightbox,
  ) {}

  ngOnInit(): void {
    //console.log(this._albums.length);
    this.refresh();
  }
  refresh(){
    let maps = this.connectionService.getMaps();
    //console.log(maps);
    maps.subscribe(data => {
      console.log(data);
      this.shows = data;
    })
    this.getBanner();
  }

  getBanner(){
    this.connectionService.getShowCover().subscribe(
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

  goHome(){
    this.chosen = "home";
    this.location.back();
  }
  
  open(index: number): void{
    this.checkShowButtons(index);
    this.showFullImg = true;
    this.index = index;
    //this.fullImgUrl = this._albums[index].src;
    //'../../assets/img/2019Umhverfing/2019Umhverfing'+ index +'.jpg'
    console.log("jáaa", index);
    //console.log()
    //console.log(this.imageBlobUrl.image);
    this.fullImgUrl = this.imageBlobUrl[index].url;
    this.imageBlobUrl.map(t => {
      console.log(t.image);
    })
  }
  nextImg(){
    this.index -= 1;
    this.checkShowButtons(this.index);
    this.fullImgUrl = this.imageBlobUrl[this.index].url;
  }
  lastImg(){
    this.index += 1;
    this.checkShowButtons(this.index);
    this.fullImgUrl =this.imageBlobUrl[this.index].url;
  }
  goBack(){
    this.showFullImg = false;
  }
  goToShow(index: number){
    console.log(index);
    console.log(this.shows[index]);

    this.mapId = this.shows[index].id;
    this.chosen = this.shows[index].name;
    this.description = this.shows[index].description;
    this.showFullImg = false;
    this.imageBlobUrl = [];
    this.isLoading = true;
    this.connectionService.getAllPicDescription(this.shows[index].id).subscribe(t => {
      console.log("jess");
      console.log(t);
      this.showDescriptionArray = t;
    })
    this.connectionService.getFilesInfo(this.mapId)
    .subscribe(t => {
      console.log("##")
      console.log(t);
      //console.log(t.length);
      //length: t.length;
      this.tempArr = [];
      this.picturesData = t;
      this.tempArr[0] = t[0]; 
      for(let i = 1 ; i < t.length; i++){
        this.tempArr.push(t[i]);
        
      }
      
      
      console.log(this.tempArr);
      //this.tempArr.sort();
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
  mapThroughPics(pic , mapId){
    console.log(pic.id);
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
      //console.log(reader.result);
     // console.log(image)
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
     let obj = {
       "image": pic, 
       "url": reader.result,
       "description": description
     }

     console.log("halló? ");
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
  /*
  go1980(){
    console.log("halló??");
    this.chosen = "1980 / Gallerí Djúpið";
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
  go1989(){
    console.log("halló??");
    this.chosen = "1989 / Hótel Lind. Á útmánuðum dvaldi ég á Kýpur og málaði mannlífið þar";
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 13; i++){
      const src = '../../assets/img/1989kypur/1989kypur'+ i +'.jpg';
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
  go1990(){
    console.log("halló??");
    this.chosen = "1990 / Fím salurinn";
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 16; i++){
      const src = '../../assets/img/1990fim/1990fim'+ i +'.jpg';
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
  go1991(){
    console.log("halló??");
    this.chosen = "1991 / Menntamálaráðuneytið";
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 4; i++){
      const src = '../../assets/img/1991menntamalar/1991'+ i +'.jpg';
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
  go1994(){
    console.log("halló??");
    this.chosen = "1994 / Listasafn Así";
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 20; i++){
      const src = '../../assets/img/1994asi/1994asi'+ i +'.jpg';
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
  go1996to1998(){
    console.log("halló??");
    this.chosen = "Guð er kona? / 1996 / Billedetværksted Brovst Danmörk. / 1997 / Gallerí Svartfugl Akureyri. 1998 / Listakot Reykjavík.  Að máta konuna í hin viðteknu karlhlutverk sem dýrkuð eru í biblíunni fannst mér spennandi og það var notalegt að upplifa þessar helgu persónur í konulíki. Þetta viðfangsefni vatt upp á sig og með sífelldum viðbótum sýndi ég mínar biblíusögur á þremur stöðum á þriggja ára tímabili. Hér má sjá nokkur verk af hverri sýningu";
    this.showFullImg = false;

    this._albums = []
    for(let i = 1; i < 37; i++){
      const src = '../../assets/img/1996_98/kona'+ i +'.jpg';
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
  go2002(){
    this.chosen = "2002 / gallerí glámur / Andlit daganna - konur á dagatali  / 365 andlit / ein mynd á dag í eitt ár";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 23; i++){
      const src = '../../assets/img/2002andlit_dagana/2002ad'+ i +'.jpg';
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
  go2005(){
    this.chosen = "2005 / 24H / Regional Museum of Savonlinna on Riihisaari Island, Finnland. Á sýningunni sýndu 34 finnskir listamenn verk sín og var sex íslenskum listamönnum boðin þáttaka. Mitt framlag var hringlaga verk sem ég nefndi ,,Sólarhringur\" (,,Circulation\") „Ég er 24 konur - ég er á 24 stöðum - ég endurfæðist á hverjum klukkutíma“";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 3; i++){
      const src = '../../assets/img/2006_24H/'+ i +'.jpg';
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
  go2011(){
    this.chosen = "2011 / Brot / Álafosskvos";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 6; i++){
      const src = '../../assets/img/2011brot/2011pusluspil'+ i +'.jpg';
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
  go2012(){
    this.chosen = "2012 / Hamskiptin / Gallerí Neue Bahnhofstraße 27 Berlín /Hamskipti / Listasalur Mosfellsbæjar";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 5; i < 39; i++){
      const src = '../../assets/img/2012hamskipti/hamskipti'+ i +'.jpg';
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
  go20015kugun(){
    this.chosen = "2015 / Kúgun / Að bjarga heiminum / Verksmiðjan Hjalteyri";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 2; i++){
      const src = '../../assets/img/2015kugun/'+ i +'.jpg';
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
  go2015(){
    this.chosen = "2015 / vKaffiboð á Korpúlfsstöðum / Gallerí Korpúlfsstaðir, Reykjavík";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 1; i < 16; i++){
      const src = '../../assets/img/2015Kaffi_a_korp/2015kaffibod'+ i +'.jpg';
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
  go2017(){
    this.chosen = "2017 / Konur og trúarbrögð / Artótek, Grófin, Reykjavík";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 1; i < 16; i++){
      const src = '../../assets/img/2017Artotek/2017artotek'+ i +'.jpg';
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
  go2018b(){
    this.chosen = "2018 / Staða kvenna / Sím salurinn, Reykjavík";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 15; i++){
      const src = '../../assets/img/2018SIM/2018SIM'+ i +'.jpg';
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
  
  go1987b(){
    this.chosen = "1987 / Gallerí Borg";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 1; i < 32; i++){
      const src = '../../assets/img/1987borg/1987_'+ i +'.jpg';
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
    this.chosen = "1987 / Gallerí Borg. Sýningin stóð yfir í 7 daga";
    
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
  go1988(){
    this.chosen = "1988 / Gallerí Gangskör";
    
    this.showFullImg = false;

    this._albums = []
    for(let i = 0; i < 13; i++){
      const src = '../../assets/img/1988gangskor/1988gang'+ i +'.jpg';
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
    this.chosen = "2009 / Gallerí Hornid / Fornminjar framtíðar. Hvort erum við mannverurnar menningarlegt fyrirbæri eða náttúrulegt? Er möguleiki á afturhvarfi til náttúrunnar? Í tæknimenningu samtímans, erum við orðin háð hlutum og tækjum í daglegu lífi, viðbót sem er orðin samvaxin okkur. Hér velti ég fyrir mér manneskjunni sem menningarlegu fyrirbrigði þar sem líf hennar er svo samofið þeirri menningu sem hún lifir í án þess að hafa raunverulegt val um annað, eða hvað? Hér sameinast mannveran borðum, stólum og að skjánum";

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
    this.chosen = "2018 / Listamessa / Hlöðuloftið, Korpúlfsstaðir";

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
  go2019(){
    this.chosen = "2019 / Rauðamelur / Nr. 3 Umhverfing, Snæfellsnesi";

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
  
*/
}
