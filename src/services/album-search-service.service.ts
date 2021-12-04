import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchResult } from 'src/models/SearchResult';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumSearchServiceService {

  constructor(private http: HttpClient) { }
  getDataFromDeezer(searchparameter: string): Observable<any> {
    return this.callAPI('Deezer', searchparameter, 'https://api.deezer.com/search?strict=on&q=' + searchparameter + '&output=jsonp');
  }
  getDataFromiTunes(searchparameter: string): Observable<any> {
    return this.callAPI('ITunes', searchparameter, 'https://itunes.apple.com/search?term=' + searchparameter);
  }
  private callAPI(type: string, searchparameter: string, uri: string): Observable<any> {
    //return this.http.get('https://itunes.apple.com/search?term=' + searchparameter);
    if (searchparameter == '') {
      alert();
      return of([]);
    }
    else {
      let apiURL: string = uri;
      return this.http.jsonp(apiURL, "callback").pipe(
        catchError((error: any) => {
          return of([]);
        }),
        map((res: any) => {
          if (res.results != undefined)
            return res.results.map((item: any) => {
              return new SearchResult(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId,
                'ITunes'
              );
            });
          else
            return of([]);
        })
      );
    }
  }
}

