import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private apiUrl = 'http://localhost:5000/api/market';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  sellItem(skinId: string, price: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/sell`, { skinId, price }, { headers: this.getHeaders() });
  }

  buyItem(itemId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/buy/${itemId}`, {}, { headers: this.getHeaders() });
  }
}
