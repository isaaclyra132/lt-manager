import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { MessageService } from 'primeng/api';
import { TasksComponent } from './pages/tasks/tasks.component';
import { HeaderComponent } from './components/header/header.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ArchivedComponent } from './pages/archived/archived.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    RegisterComponent,
    TasksComponent,
    HeaderComponent,
    NewTaskComponent,
    ArchivedComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    DividerModule,
    PasswordModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    InputTextareaModule,
  ],
  providers: [MessageService, DeviceDetectorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
