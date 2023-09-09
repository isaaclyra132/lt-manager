import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss'],
})
export class ArchivedComponent implements OnInit {
  archivedTasks: any[] = [];

  ngOnInit() {
    this.archivedTasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Sumário da task 1',
        status: 'FINALIZADA',
        updatedAt: '2023-09-08',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Sumário da task 2',
        status: 'EM PROGRESSO',
        updatedAt: '2023-09-08',
      },
      {
        id: '3',
        title: 'Task 3',
        description:
          'Sumário da task 3AAAAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA',
        status: 'FINALIZADA',
        updatedAt: '2023-09-08',
      },
      {
        id: '4',
        title: 'Task 4',
        description: 'Sumário da task 4',
        status: 'NÃO INICIADA',
        updatedAt: '2023-09-08',
      },
    ];
  }
}
