import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [ConfirmationService],
})
export class TasksComponent implements OnInit {
  userTasks: any[];
  statusTypes: any[];

  task: any = {};
  taskCopy: any = {};
  taskIndex: number;
  editTaskDialog: boolean = false;
  editTaskSubmitted: boolean = false;

  loading: boolean = false;

  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.statusTypes = [
      { name: 'NÃO INICIADA', value: 'NAO_INICIADA' },
      { name: 'EM PROGRESSO', value: 'EM_PROGRESSO' },
      { name: 'FINALIZADA', value: 'FINALIZADA' },
    ];
    this.userTasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Sumário da task 1',
        status: 'FINALIZADA',
        createdAt: '2023-09-08',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Sumário da task 2',
        status: 'EM PROGRESSO',
        createdAt: '2023-09-08',
      },
      {
        id: '3',
        title: 'Task 3',
        description:
          'Sumário da task 3AAAAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA',
        status: 'FINALIZADA',
        createdAt: '2023-09-08',
      },
      {
        id: '4',
        title: 'Task 4',
        description: 'Sumário da task 4',
        status: 'NÃO INICIADA',
        createdAt: '2023-09-08',
      },
    ];
  }

  showEditTaskDialog(taskIndex: number, task: any) {
    this.task = { ...task };
    this.taskCopy = { ...this.task };
    this.taskIndex = taskIndex;
    this.editTaskDialog = true;
  }

  editTask() {}

  hideEditTaskDialog() {
    this.editTaskDialog = false;
  }
  // editarCadastro(cadastroIndex: number, cadastro: any) {
  //   this.cadastro = { ...cadastro };
  //   this.copiaCadastro = { ...this.cadastro };
  //   this.cadastroIndex = cadastroIndex;
  //   this.editarCadastroDialog = true;
  // }

  // atualizarCadastro() {
  //   this.cadastroSubmitted = true;

  //   if (
  //     this.cadastro.nome &&
  //     this.cadastro.email &&
  //     this.cadastro.telefone &&
  //     (this.cadastro.servidorStatus || this.cadastro.instituidorPensao)
  //   ) {
  //     if (this.cadastro.tipoUsuario == 'PENSIONISTA') {
  //       this.cadastro.servidorStatus = undefined;
  //     } else if (this.cadastro.tipoUsuario == 'SERVIDOR') {
  //       this.cadastro.instituidorPensao = undefined;
  //     }

  //     this.loading = true;
  //     this.usuarioService
  //       .atualizarCadastro(this.cadastro.id, this.cadastro)
  //       .subscribe({
  //         next: () => {
  //           this.cadastros[this.cadastroIndex] = this.cadastro;
  //           this.messageService.add({
  //             severity: 'info',
  //             summary: 'Cadastro atualizado',
  //             detail: 'O cadastro foi atualizado com as novas informações',
  //             life: 3000,
  //           });

  //           this.cadastros = [...this.cadastros];
  //           this.editarCadastroDialog = false;
  //           this.cadastro = {
  //             id: '',
  //             nome: '',
  //             email: '',
  //             telefone: '',
  //             tipoUsuario: '',
  //             dependentes: [],
  //           };
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         },
  //         complete: () => {
  //           this.loading = false;
  //         },
  //       });
  //   }
  // }

  // hideEditarCadastroDialog() {
  //   this.editarCadastroDialog = false;
  // }

  archiveTask() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja arquivar esta task?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          // TODO - Enviar request de alterar status para arquivada
          severity: 'success',
          summary: 'Task arquivada',
          detail:
            'A sua task foi arquivada com sucesso, você pode acessar a aba de tasks arquivadas para visualizá-la.',
          life: 3000,
        });
      },
    });
  }

  finishTask() {
    this.confirmationService.confirm({
      message:
        'Você tem certeza que deseja alterar o estado da task pra FINALIZADA?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO - Enviar request de alterar status para finalizada
        this.messageService.add({
          severity: 'success',
          summary: 'Task finalizada',
          detail: 'A sua task foi para o status de FINALIZADA.',
          life: 3000,
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
}
