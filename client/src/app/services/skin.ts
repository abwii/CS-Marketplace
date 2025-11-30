import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkinService {
  private apiUrl = 'http://localhost:5000/api/skins';

  constructor(private http: HttpClient) { }

  getSkins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
