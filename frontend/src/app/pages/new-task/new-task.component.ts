import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  newTaskForm: FormGroup;

  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createNewTaskForm();
  }
  createNewTaskForm() {
    this.newTaskForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  createTask() {
    this.submitted = true;
    if (this.newTaskForm.valid) {
      this.loading = true;
      this.taskService.createTask(this.newTaskForm.value).subscribe({
        next: () => {
          this.showSuccessNewTaskToast();
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.showFailedNewTaskToast();
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.showFailedNewTaskToast();
    }
  }

  showFailedNewTaskToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Preencha o formulário corretamente e tente novamente',
      life: 3000,
    });
  }

  showSuccessNewTaskToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Uma nova task foi cadastrada com sucesso',
      life: 3000,
    });
  }
}
