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
}
