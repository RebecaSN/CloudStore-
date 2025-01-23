import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authKey: string | null = null;

  constructor(
    private router: Router
  ) {}

  setAuthKey(key: string): void {
    this.authKey = key;
    localStorage.setItem('authKey', key);
  }

  getAuthKey(): string | null {
    if (!this.authKey) {
      this.authKey = localStorage.getItem('authKey');
    }
    return this.authKey;
  }

  isAuthenticated(): boolean {
    return !!this.getAuthKey();
  }

  logout(): void {
    this.authKey = null;
    localStorage.removeItem('authKey');
    this.router.navigate(['/sign-in']);
  }
}
