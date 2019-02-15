import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StoredService {
  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getUserStored(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/stored.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  getUserStoredByCateogory(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/stored.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  addToStoredByBarcode(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/stored.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  updateStoredItemQuantity(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/stored.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  removeStoredItem(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/stored.php?query=${data}`)
      .pipe(map((response: any) => response));
  }
}
