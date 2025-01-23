import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userLogin: { userName: string; password: string } = { userName: '', password: '' };

  authKey: string = '';
  isLoading: boolean = false;
  public formResetToggle = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;

    // if (!this.authKey.trim()) {
    //   alert('Authorization key is required.');
    //   return;
    // }

    // this.isLoading = true;
    // this.authService.setAuthKey(this.authKey);
    // this.isLoading = false;

    // this.router.navigate(['/home']);

    if (!this.authKey.trim() || !this.userLogin.userName || !this.userLogin.password) {
      alert('Authorization key, username, and password are required.');
      this.isLoading = false;
      return;
    }

    // Salva a chave de autenticação
    this.authService.setAuthKey(this.authKey);

    // Simula um processo de autenticação e redireciona
    setTimeout(() => {
      console.log('Usuário autenticado:', this.userLogin);
      this.isLoading = false;

      // Redireciona para a página principal
      this.router.navigate(['/home']);
    }, 1000);



  }

  reset(): void {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }

}
