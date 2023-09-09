import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
      // TODO - Chamar o service de autenticacao com as credenciais inseridas
      this.showSuccessLoginToast();
      this.router.navigate(['tasks']);
    } else {
      this.showFailedLoginToast();
    }
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
