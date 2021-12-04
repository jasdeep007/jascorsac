import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { SearchResult } from 'src/models/SearchResult';
import { AlbumSearchServiceService } from 'src/services/album-search-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Album Search Demo';
  loading: boolean = false;
  viewresults: Observable<SearchResult[]> = of([]);
  searchField: FormControl = new FormControl();
  constructor(private albumSearchService: AlbumSearchServiceService) { }
  ngOnInit() {
    this.searchField = new FormControl('');
    this.viewresults = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => {
        (this.loading = true)
      }),
      switchMap(term => this.searchAlbum(term)),
      tap(_ => (this.loading = false))
    );
  }
  //this.searchAlbum('radiohead');
  searchAlbum(searchparameter: string): Observable<any> {
    return forkJoin({
      Deezer: this.albumSearchService.getDataFromDeezer(searchparameter),
      ITunes: this.albumSearchService.getDataFromiTunes(searchparameter)
    }).pipe(
      map((resultdata) => {
        let finalresult: SearchResult[] = [];
        if (typeof resultdata.Deezer.length != 'undefined' && resultdata.Deezer != [])
          finalresult.push(...resultdata.Deezer);
        if (typeof resultdata.ITunes.length != 'undefined' && resultdata.ITunes != [])
          finalresult.push(...resultdata.ITunes);
        return finalresult;
      })
    );
  }
}
