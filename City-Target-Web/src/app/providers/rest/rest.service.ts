import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface _Response {
  success: Boolean,
  data?: any,
  user?: any,
  token?: any
}

@Injectable({
  providedIn: 'root'
})

export class RestService {

  public host = environment.serverUrl

  constructor(public http: HttpClient) {

    console.log('HOST', this.host);

  }

  post(url: string, data: any = {}) {

    return this.http.post(`${this.host}/api/${url}`, data).pipe(map((data) => data as _Response)).toPromise()
  }

  get(url: string, params: any = {}) {

    let _params = new HttpParams()

    if (params) {

      for (const key in params) {
        _params = _params.set(key, params[key])
      }
    }

    return this.http.get(`${this.host}/api/${url}`, { params: _params }).pipe(map((data) => data as _Response)).toPromise()
  }

  delete(url: string, params: any = {}) {

    let _params = new HttpParams()

    if (params) {

      for (const key in params) {
        _params.set(key, params[key])
      }
    }


    return this.http.delete(`${this.host}/api/${url}`, { params: _params }).pipe(map((data) => data as _Response)).toPromise()
  }

  put(url: string, data: any = {}) {

    return this.http.put(`${this.host}/api/${url}`, data).pipe(map((data) => data as _Response)).toPromise()
  }


}
