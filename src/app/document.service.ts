import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NavItemInterface } from './index/nav-tree/nav-item.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl: string = './docs';
  constructor(private httpClient: HttpClient) { }
  getPage(page: string): Observable<string> {
    return this.httpClient.get(
      this.baseUrl + page + '.md',
      { responseType: 'text' as 'json' }
    ).pipe(
      catchError(e => of(''))
    ) as Observable<string>;
  }
  getSideNav(): Observable<Array<NavItemInterface>> {
    return this.httpClient.get(this.baseUrl + '/side-nav.json') as Observable<Array<NavItemInterface>>;
  }
}
