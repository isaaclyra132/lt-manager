import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Error404Component } from './pages/error404/error404.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'new-task',
    component: NewTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'archived',
    component: ArchivedComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
