import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthguardGuard} from './authguard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', component: UserListComponent, canActivate:[AuthguardGuard]},
  { path: 'add', component: CreateUserComponent, canActivate:[AuthguardGuard] },
  { path: 'update/:id', component: UpdateUserComponent, canActivate:[AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthguardGuard]},
  { path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }