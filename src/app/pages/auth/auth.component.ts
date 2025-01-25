import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authKey: string = '';
  isLoading: boolean = false;
  public formResetToggle = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.authKey = '';
  }


  login() {
    if (!this.authKey.trim()) {
      alert('Authorization token is required.');
      return;
    }

    this.isLoading = true;

    this.authService.validateAuthToken(this.authKey).subscribe(
      () => {
        localStorage.setItem('authKey', this.authKey);
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Invalid authorization token.');
      }
    ).add(() => {
      this.isLoading = false;
    });
  }

  reset(): void {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }

}
