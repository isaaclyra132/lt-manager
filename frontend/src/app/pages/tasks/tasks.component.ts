import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [ConfirmationService],
})
export class TasksComponent implements OnInit {
  userTasks: any[];
  statusTypes: any[];

  task: Task = {};
  taskCopy: Task = {};
  taskIndex: number;
  editTaskDialog: boolean = false;
  editTaskSubmitted: boolean = false;

  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.statusTypes = [
      { name: 'NÃO INICIADA', value: 'NAO_INICIADA' },
      { name: 'EM PROGRESSO', value: 'EM_PROGRESSO' },
      { name: 'FINALIZADA', value: 'FINALIZADA' },
    ];

    this.getUserTasks();
  }

  getUserTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.userTasks = res;
      },
    });
  }

  showEditTaskDialog(taskIndex: number, task: any) {
    this.task = { ...task };
    this.taskCopy = { ...this.task };
    this.taskIndex = taskIndex;
    this.editTaskDialog = true;
  }

  editTask() {
    if (this.task.title && this.task.description && this.task.status) {
      this.submitted = true;
      this.loading = true;
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.getUserTasks();
          this.showEditTaskSuccessToast();
          this.hideEditTaskDialog();
        },
        error: () => {
          this.showEditTaskErrorToast();
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.showFormErrorToast();
    }
  }

  hideEditTaskDialog() {
    this.editTaskDialog = false;
  }

  archiveTask(task: Task) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja arquivar esta task?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        task.status = 'ARQUIVADA';
        this.loading = true;
        this.taskService.updateTask(task).subscribe({
          next: () => {
            this.showArchivedSuccessToast();
            this.getUserTasks();
          },
          error: () => {
            this.showArchivedErrorToast();
          },
          complete: () => {
            this.loading = false;
          },
        });
      },
    });
  }

  finishTask(task: Task) {
    this.confirmationService.confirm({
      message:
        'Você tem certeza que deseja alterar o estado da task pra FINALIZADA?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        task.status = 'FINALIZADA';
        this.loading = true;
        this.taskService.updateTask(task).subscribe({
          next: () => {
            this.showArchivedSuccessToast();
            this.getUserTasks();
          },
          error: () => {
            this.showArchivedErrorToast();
          },
          complete: () => {
            this.loading = false;
          },
        });
      },
    });
  }

  isFinished(status: string) {
    if (status === 'FINALIZADA') {
      return true;
    }
    return false;
  }

  getStatusName(status: String): string {
    switch (status) {
      case 'NAO_INICIADA':
        return 'NÃO INICIADA';
      case 'EM_PROGRESSO':
        return 'EM PROGRESSO';
      case 'FINALIZADA':
        return 'FINALIZADA';
      case 'ARQUIVADA':
        return 'ARQUIVADA';
      default:
        return 'INDEFINIDO';
    }
  }

  getSeverityByStatus(status: String) {
    switch (status) {
      case 'NAO_INICIADA':
        return 'warning';
      case 'EM_PROGRESSO':
        return "'info'";
      case 'FINALIZADA':
        return 'success';
      case 'ARQUIVADA':
        return 'danger';
      default:
        return 'INDEFINIDO';
    }
  }

  // TODO - Refatorar toast para diminuir repetição
  showFormErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'O seu formulário não está preenchido corretamente.',
      life: 3000,
    });
  }

  showEditTaskSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'As informações da sua task foi atualizada.',
      life: 3000,
    });
  }

  showEditTaskErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail:
        'Ocorreu um erro ao atualizar as informações da task, tente novamente.',
      life: 3000,
    });
  }

  showArchivedErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro ao arquivar a task, tente novamente.',
      life: 3000,
    });
  }

  showArchivedSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Task arquivada',
      detail:
        'A sua task foi arquivada com sucesso, você pode acessar a aba de tasks arquivadas para visualizá-la.',
      life: 3000,
    });
  }
}
