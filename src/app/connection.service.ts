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

  getMaps(): Observable<any>{
    return this.http.get('http://anna--backend.herokuapp.com/api/map/info')
  }
  getFile(mapId: number ,id: number):Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/file/${mapId}/${id}`, {
      responseType: "blob" as "json"
    });
  }
  getFilesInfo(mapId: number):Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/file/info/${mapId}`)
  }
  postMap(map: any):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/map/upload', map)
  }
  public sendFormData(formData, mapId :number) {
    console.log("========");
    console.log(mapId);
    return this.http.post<any>(`http://anna--backend.herokuapp.com/api/file/upload/${mapId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  postPicDescription(descriptions: any):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/file/description/upload', descriptions)
  }
  getPicDescription(mapId: number, id: number):Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/file/description/${mapId}/${id}`)
  }
  getAllPicDescription(mapId: any):Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/files/getAllDescription/${mapId}`)
  }
  deletePic(mapId: number, id: number):Observable<any>{
    return this.http.delete(`http://anna--backend.herokuapp.com/api/file/${mapId}/${id}`)
  }
  deleteShow(mapId: number):Observable<any>{
    return this.http.delete(`http://anna--backend.herokuapp.com/api/map/${mapId}`)
  }
  register(user: any):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/users', user)
  }
  login(user: any):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/login', user)
  }

  postCv(formData):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/cv/upload', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  updateCv(formData):Observable<any>{
    return this.http.put('http://anna--backend.herokuapp.com/api/cv/update', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  getCv():Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/cv`, {
      responseType: "blob" as "json"
    });
  }

  postCover(formData):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/cover/upload', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  updateCover(formData):Observable<any>{
    return this.http.put('http://anna--backend.herokuapp.com/api/cover/update', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  getCover():Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/cover`, {
      responseType: "blob" as "json"
    });
  }
  postShowCover(formData):Observable<any>{
    return this.http.post('http://anna--backend.herokuapp.com/api/showcover/upload', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  updateShowCover(formData):Observable<any>{
    return this.http.put('http://anna--backend.herokuapp.com/api/showcover/update', formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  getShowCover():Observable<any>{
    return this.http.get(`http://anna--backend.herokuapp.com/api/showcover`, {
      responseType: "blob" as "json"
    });
  }
}
