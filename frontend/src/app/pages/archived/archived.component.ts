import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss'],
})
export class ArchivedComponent implements OnInit {
  archivedTasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getArchivedTasks();
  }

  getArchivedTasks() {
    this.taskService.getArchivedTasks().subscribe({
      next: (res) => {
        this.archivedTasks = res;
      },
    });
  }
}
