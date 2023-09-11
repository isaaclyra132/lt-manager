import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validator: this.comparePasswords }
    );
  }

  comparePasswords(group: FormGroup) {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { differentPasswords: true };
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      // TODO - Chamar o service de usuario para criar novo usuario no sistema
      this.userService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.showSuccessToast();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.showErrorToast();
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.showErrorToast();
    }
  }

  showErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Preencha o formulário corretamente',
      life: 3000,
    });
  }

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cadastro bem-sucedido',
      detail: 'Agora você já pode realizar o login no sistema',
      life: 3000,
    });
  }
}
