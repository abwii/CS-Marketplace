import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.loadUser();
        }
      })
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.loadUser();
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loadUser() {
    const token = this.getToken();
    if (token) {
      this.http.get(`${this.apiUrl}/user`, {
        headers: { 'x-auth-token': token }
      }).subscribe({
        next: (user) => this.userSubject.next(user),
        error: () => this.logout()
      });
    }
  }
}
