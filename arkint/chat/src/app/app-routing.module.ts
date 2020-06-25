import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/login/dashboardComponent/dashboard/dashboard.component';
import { ChatComponent } from './component/login/dashboardComponent/dashboard/chatComponent/chat/chat.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login', component: LoginComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        children: [
          { path: 'chat', component: ChatComponent }
        ]
      }
    ]
  },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
