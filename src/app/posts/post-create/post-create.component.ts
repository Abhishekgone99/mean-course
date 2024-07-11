// using two-way binding

// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { Ipost } from '../post.model';

// @Component({
//   selector: 'app-post-create',
//   standalone: true,
//   imports: [FormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule],
//   templateUrl: './post-create.component.html',
//   styleUrl: './post-create.component.css'
// })
// export class PostCreateComponent {
//   enteredTitle = '';
//   enteredContent = '';
//   @Output() postCreated =  new EventEmitter<Ipost>();

//   onAddPost(){   
//     const post :Ipost = {
//       title: this.enteredTitle,
//       content: this.enteredContent
//     };
//     this.postCreated.emit(post);
//   }
// }



// using template driven forms


// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { Ipost } from '../post.model';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-post-create',
//   standalone: true,
//   imports: [FormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,NgIf],
//   templateUrl: './post-create.component.html',
//   styleUrl: './post-create.component.css'
// })
// export class PostCreateComponent {
//   enteredTitle = '';
//   enteredContent = '';
//   @Output() postCreated =  new EventEmitter<Ipost>();

//   onAddPost(form: any){
//     if(form.invalid){
//       return
//     }   
//     const post :Ipost = {
//       title: form.value.title,
//       content: form.value.content
//     };
//     this.postCreated.emit(post);
//   }
// }


// using service

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ipost } from '../post.model';
import { NgIf } from '@angular/common';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,NgIf],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService:PostsService){}

  onAddPost(form: any){
    if(form.invalid){
      return
    }   
    const post :Ipost = {
      title: form.value.title,
      content: form.value.content
    };
    
    this.postsService.addPosts(post)
  }
}