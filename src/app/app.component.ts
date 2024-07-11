// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { PostCreateComponent } from "./posts/post-create/post-create.component";
// import { HeaderComponent } from "./header/header.component";
// import { PostListComponent } from "./posts/post-list/post-list.component";
// import { Ipost } from './posts/post.model';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   storedposts: Ipost[] = [];

//   onPostAdded(post: Ipost){
//     this.storedposts.push(post);
//   }
// }



// using service

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}