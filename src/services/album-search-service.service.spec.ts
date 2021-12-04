import { TestBed } from '@angular/core/testing';

import { AlbumSearchServiceService } from './album-search-service.service';

describe('AlbumSearchServiceService', () => {
  let service: AlbumSearchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumSearchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
