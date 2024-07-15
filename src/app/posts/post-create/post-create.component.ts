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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ipost } from '../post.model';
import { NgIf } from '@angular/common';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,NgIf],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Ipost;

  constructor(public postsService:PostsService, public route:ActivatedRoute){}

  ngOnInit(): void {
     this.route.paramMap.subscribe((paramMap:ParamMap )=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        // this.post = this.postsService.getPost(this.postId)
        this.postsService.getPost(this.postId).subscribe(postData => {
            this.post = { id: postData._id, title: postData.title, content: postData.content};
        })
      }else{
        this.mode = 'create';
        this.postId = null;
      }
     })  
  }

  onSavePost(form: any){
    if(form.invalid){
      return
    }   
    // const post :Ipost = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    if(this.mode === 'create'){
      this.postsService.addPosts(form.value.title,form.value.content);
    }else{
      this.postsService.updatePost(this.postId,form.value.title,form.value.content)
    }

   
    form.resetForm();
  }
}