import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getUserList(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/list.php?query=${data}`)
      .pipe(map((response: any) => response));
  }
  addListItem(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/list.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  updateListItemQuantity(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/list.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  removeListItem(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/list.php?query=${data}`)
      .pipe(map((response: any) => response));
  }
}
