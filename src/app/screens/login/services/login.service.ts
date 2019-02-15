import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  loginUser(data: any): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/user.php?query=${data}`)
      .pipe(map((response: any) => response));
  }
}
