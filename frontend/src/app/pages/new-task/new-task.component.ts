import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  newTaskForm: FormGroup;

  submitted: boolean = false;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

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
  }
}
