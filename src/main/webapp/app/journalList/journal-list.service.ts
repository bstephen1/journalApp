import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class JournalListService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<{}> {
    return this.http.get(SERVER_API_URL + 'api/journals');
  }
}
