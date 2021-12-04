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
    //return this.http.get('https://api.deezer.com/search?q='+searchparameter);
    if (searchparameter == '') {
      return of([]);
    }
    else {
      let apiURL: string = 'https://api.deezer.com/search?strict=on&q=' + searchparameter + '&output=jsonp';
      return this.http.jsonp(apiURL, "callback")
        .pipe(
          catchError((error: any) => {
            return of([]);
          }),
          map((res: any) => {
            if (res.data != undefined)
              return res.data.map((item: any) => {
                return new SearchResult(
                  item.title,
                  item.artist.name,
                  item.album.tracklist,
                  item.artist.picture_small,
                  item.artist.id,
                  'Deezer'
                );
              });
            else
              return of([]);
          })
        )

        ;
    }
  }
  handleError(arg0: string, arg1: string): any {
    throw new Error('Method not implemented.');
  }
  getDataFromiTunes(searchparameter: string): Observable<any> {
    //return this.http.get('https://itunes.apple.com/search?term=' + searchparameter);
    if (searchparameter == '') {
      alert();
      return of([]);
    }
    else {
      let apiURL: string = 'https://itunes.apple.com/search?term=' + searchparameter;
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

