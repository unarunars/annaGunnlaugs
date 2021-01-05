/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  Service who talkes to the endpoints in the backend.
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2020 
 *
 *
 **************************************************************************** */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
import { JsonPipe } from '@angular/common';
import { HttpClient,HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  base_url:string = 'https://anna--backend.herokuapp.com/';
  constructor(
    private http: HttpClient
    ) { }
/*
 * Input none
 * get all the maps 
 * Returns the data as Observerable
 */
  getMaps(): Observable<any>{
    return this.http.get('https://anna--backend.herokuapp.com/api/map/info')
  }
  /*
 * Input mapId of the show selected
 * Inpt id number of photo selected
 * get the photo as blob data
 * Returns the data as Observerable
 */
  getFile(mapId: number ,id: number):Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/file/${mapId}/${id}`, {
      responseType: "blob" as "json"
    });
  }
  /*
 * Input 
 * get all the maps 
 * Returns the data as Observerable
 */
  getFilesInfo(mapId: number):Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/file/info/${mapId}`)
  }
  /*
 * Input map as object
 * post map 
 * Returns the data as Observerable
 */
  postMap(map: any):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/map/upload', map)
  }
  /*
 * Input map as object
 * Input Id og the map 
 * put, updated the map
 * Returns the data as Observerable
 */
  updateMap(map: any, mapId: number):Observable<any>{
    return this.http.put(`https://anna--backend.herokuapp.com/api/update/map/${mapId}`, map)
  }
  /*
 * Input photo as formdata
 * Input the id of the map selected
 * post the formdata in the selected map
 * Returns the data as Observerable
 */
  public sendFormData(formData, mapId :number) {
    console.log("========");
    console.log(mapId);
    return this.http.post<any>(`https://anna--backend.herokuapp.com/api/file/upload/${mapId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  /*
 * Input description as object
 * post description
 * Returns the data as Observerable
 */
  postPicDescription(descriptions: any):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/file/description/upload', descriptions)
  }
  /*
 * Input id of the map
 * Input id of the photo
 * get the selected photo in the selected map
 * Returns the data as Observerable
 */
  getPicDescription(mapId: number, id: number):Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/file/description/${mapId}/${id}`)
  }
  /*
 * Input id of the map
 * get all the descriptions in selected map
 * Returns the data as Observerable
 */
  getAllPicDescription(mapId: any):Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/files/getAllDescription/${mapId}`)
  }
  /*
 * Input id of the map
 * Input id of the selected photo
 * deletes the photo
 * Returns the data as Observerable
 */
  deletePic(mapId: number, id: number):Observable<any>{
    return this.http.delete(`https://anna--backend.herokuapp.com/api/file/${mapId}/${id}`)
  }
  /*
 * Input if of the map
 * deletes the map
 * Returns the data as Observerable
 */
  deleteShow(mapId: number):Observable<any>{
    return this.http.delete(`https://anna--backend.herokuapp.com/api/map/${mapId}`)
  }
  /*
 * Input user as object
 * creates a user
 * Returns the data as Observerable
 */
  register(user: any):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/users', user)
  }
  /*
 * Input user as object
 * login user if the user is in the table
 * Returns the data as Observerable
 */
  login(user: any):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/login', user)
  }
/*
 * Input image as formdata
 * post the cv
 * Returns the data as Observerable
 */
  postCv(formData):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/cv/upload', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  /*
 * Input image as formdata
 * updates the cv
 * Returns the data as Observerable
 */
  updateCv(formData):Observable<any>{
    return this.http.put('https://anna--backend.herokuapp.com/api/cv/update', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  /*
 * Input none
 * gets the cv
 * Returns the data as Observerable
 */
  getCv():Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/cv`, {
      responseType: "blob" as "json"
    });
  }
  /*
 * Input image as formdata
 * post the cover photo
 * Returns the data as Observerable
 */
  postCover(formData):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/cover/upload', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  /*
 * Input image as formdata
 * updates the cover photo
 * Returns the data as Observerable
 */
  updateCover(formData):Observable<any>{
    return this.http.put('https://anna--backend.herokuapp.com/api/cover/update', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  /*
 * none
 * gets the cover photo
 * Returns the data as Observerable
 */
  getCover():Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/cover`, {
      responseType: "blob" as "json"
    });
  }
  /*
 * Input image as formdata
 * post the show cover
 * Returns the data as Observerable
 */
  postShowCover(formData):Observable<any>{
    return this.http.post('https://anna--backend.herokuapp.com/api/showcover/upload', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  /*
 * Input image as formdata
 * updates the show cover
 * Returns the data as Observerable
 */
  updateShowCover(formData):Observable<any>{
    return this.http.put('https://anna--backend.herokuapp.com/api/showcover/update', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  /*
 * Input none
 * gets the show cover
 * Returns the data as Observerable
 */
  getShowCover():Observable<any>{
    return this.http.get(`https://anna--backend.herokuapp.com/api/showcover`, {
      responseType: "blob" as "json"
    });
  }
  /*
 * Input id of the map
 * Input id of the photo
 * deletes the description of the photo
 * Returns the data as Observerable
 */
  deleteDescription(mapId: number, photoId: number):Observable<any>{
    return this.http.delete(`https://anna--backend.herokuapp.com/api/file/descriptions/delete/${mapId}/${photoId}`)
  }
  /*
 * Input id of the map
 * Input id of the photo
 * Input the new description of the show
 * updates the descriptions 
 * Returns the data as Observerable
 */
  updateDescription(mapId: number, photoId: number, show):Observable<any>{
    return this.http.put(`https://anna--backend.herokuapp.com/api/files/update/${mapId}/${photoId}`,show)
  }
}
