import { Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // {path:'', redirectTo:'list', pathMatch:'full'},
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:postId',
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../app/auth/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
];
