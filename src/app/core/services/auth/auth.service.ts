import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authKey: string | null = null;
  private apiUrl = 'http://rest-items.research.cloudonix.io/items';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  validateAuthToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }

  setAuthKey(key: string): void {
    this.authKey = key;
    localStorage.setItem('authKey', key);
  }

  getAuthKey(): string | null {
    // if (!this.authKey) {
    //   this.authKey = localStorage.getItem('authKey') || null;
    // }
    // return this.authKey;
    return localStorage.getItem('authKey'); // Recupera o token armazenado
  }

  isAuthenticated(): boolean {
    return !!this.getAuthKey();
  }

  logout(): void {
    //this.authKey = null;
    localStorage.removeItem('authKey');
    this.router.navigate(['/sign-in']);
  }
}
