import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  constructor(protected _http: HttpClient, @Inject('env') private env: any) {}

  get(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
    return this._http.get(`${this.env.apiServer}/${url}`, {
      headers: headers,
      params: params,
    });
  }

  put(
    body: any,
    url: string,
    params?: any,
    headers?: HttpHeaders
  ): Observable<any> {
    return this._http.put(`${this.env.apiServer}/${url}`, body, {
      headers: headers,
      params: params,
    });
  }

  post(
    body: any,
    url: string,
    params?: any,
    headers?: HttpHeaders
  ): Observable<any> {
    return this._http.post(`${this.env.apiServer}/${url}`, body, {
      headers: headers,
      params: params,
    });
  }


  uploadFile(
    body: any,
    url: string,
    params?: any,
    headers?: HttpHeaders
  ): Observable<any> {
    return this._http.post(`${this.env.apiServer}/${url}`, body, {
      headers: headers,
      params: params,
    });
  }

 downloadFile = (url: string): Observable<any> => {
      return this._http.get(`${this.env.apiServer}/${url}`, {
        responseType: 'blob',
      });
  };

  delete(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
    return this._http.delete(`${this.env.apiServer}/${url}`, {
      headers: headers,
      params: params,
    });
  }
}
