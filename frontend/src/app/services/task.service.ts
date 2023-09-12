import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseApiUrl: string = '/api/lt';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(`${this.baseApiUrl}/tasks`, {
        withCredentials: false,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getArchivedTasks(): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(`${this.baseApiUrl}/tasks/archived`, {
        withCredentials: false,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  createTask(newTask: FormGroup): Observable<Task> {
    return this.httpClient
      .post(`${this.baseApiUrl}/task`, newTask, {
        withCredentials: false,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  updateTask(taskUpdated: any): Observable<Task> {
    return this.httpClient
      .put(`${this.baseApiUrl}/task/${taskUpdated.id}`, taskUpdated, {
        withCredentials: false,
      })
      .pipe(retry(2), catchError(this.handleError));
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
