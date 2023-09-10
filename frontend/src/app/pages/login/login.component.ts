import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.cookieService.set('AUTH-TOKEN', res.token, {
            expires: this.createExpirationDate(),
            secure: true,
          });
          this.loading = true;
          this.showSuccessLoginToast();
          this.router.navigate(['tasks']);
        },
        error: (err) => {
          this.showFailedLoginToast();
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  createExpirationDate(): Date {
    const expirationDate: Date = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 7200);
    return expirationDate;
  }

  showFailedLoginToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Credenciais inválidas',
      detail: 'Preencha suas credenciais corretamente',
      life: 3000,
    });
  }

  showSuccessLoginToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Login bem-sucedido',
      detail: 'Bem-vindo ao LT.Manager',
      life: 3000,
    });
    console.log('deu certo');
  }
}
