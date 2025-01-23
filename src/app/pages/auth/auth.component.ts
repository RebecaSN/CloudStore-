import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
 // userLogin: { userName: string; password: string } = { userName: '', password: '' };

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
        // Token válido: Salva no localStorage e redireciona
        localStorage.setItem('authKey', this.authKey); // Armazena o token apenas após validação
        this.router.navigate(['/home']);
      },
      (error) => {
        // Token inválido: Mostra alerta
        alert('Invalid authorization token.');
        console.error('Login error:', error);
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
