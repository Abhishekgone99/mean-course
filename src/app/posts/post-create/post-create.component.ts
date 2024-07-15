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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ipost } from '../post.model';
import { NgIf } from '@angular/common';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { mimeType } from './mime-type.vaildator';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,MatProgressSpinnerModule ,NgIf],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Ipost;
  isLoading:boolean = false;
  form:FormGroup;
  imagePreview:string;

  constructor(public postsService:PostsService, public route:ActivatedRoute){}

  ngOnInit(): void {
     this.form =new FormGroup({
      title : new FormControl(null , {validators : [Validators.required,Validators.minLength(3)]}),
      content : new FormControl(null , {validators: [Validators.required]}),
      image : new FormControl(null ,{validators: [Validators.required], asyncValidators: [mimeType]})
     })
     this.route.paramMap.subscribe((paramMap:ParamMap )=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        // this.post = this.postsService.getPost(this.postId)
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = { id: postData._id, title: postData.title, content: postData.content, imagePath: null};
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: null
            })
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
     })  
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost(){
    // if(this.form.invalid){
    //   return
    // }   
    // const post :Ipost = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPosts(this.form.value.title,this.form.value.content, this.form.value.image);
    }else{
      this.postsService.updatePost(this.postId,this.form.value.title,this.form.value.content)
    }

    this.form.reset();
  }
}