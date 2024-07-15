import { Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

export const routes: Routes = [
    // {path:'', redirectTo:'list', pathMatch:'full'},
    {path:'', component : PostListComponent},
    {path:'create', component : PostCreateComponent},
    {path:"edit/:postId", component: PostCreateComponent}
];
