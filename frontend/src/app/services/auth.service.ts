import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, retry, throwError } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string = '/api/lt';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    public router: Router
  ) {}

  login(loginForm: FormGroup): Observable<any> {
    return this.httpClient
      .post(`${this.baseApiUrl}/auth/login`, loginForm, {
        withCredentials: false,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getToken() {
    return this.cookieService.get('AUTH-TOKEN');
  }

  getCurrentUser() {
    return jwtDecode(this.cookieService.get('AUTH-TOKEN'));
  }

  get isLoggedIn(): boolean {
    return this.cookieService.check('AUTH-TOKEN');
  }

  logout() {
    this.cookieService.delete('AUTH-TOKEN');
    this.router.navigate(['login']);
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
