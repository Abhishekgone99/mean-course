// import { NgFor, NgIf } from '@angular/common';
// import { Component, Input} from '@angular/core';
// import {MatExpansionModule} from '@angular/material/expansion';
// import { Ipost } from '../post.model';

// @Component({
//   selector: 'app-post-list',
//   standalone: true,
//   imports: [MatExpansionModule,NgFor ,NgIf],
//   templateUrl: './post-list.component.html',
//   styleUrl: './post-list.component.css'
// })
// export class PostListComponent {

// //  posts = [
// //   {title: "First Post", content:"This is the first post's content"},
// //   {title: "Second Post", content:"This is the second post's content"},
// //   {title: "THird Post", content:"This is the third post's content"}
// //  ]
// @Input()  posts:Ipost[] = [];
// }


// using service to fetch posts instead of component interaction using @output and @Input decorators

import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ipost } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule,NgFor ,NgIf,MatButtonModule,RouterLink,MatProgressSpinnerModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit,OnDestroy {

  posts:Ipost[] = [];
  private postsSub: Subscription= new Subscription();
  isLoading:boolean = false;

constructor(public postsService:PostsService){}

ngOnInit(): void {
  this.isLoading =true;
  this.postsService.getPosts();
  
  this.postsService.getPostUpdateListener().subscribe((posts:Ipost[])=>{
    this.isLoading =false;
    this.posts = posts;
  })
}

onDelete(postId: any){
  this.postsService.deletePost(postId)
}

ngOnDestroy(): void {
  this.postsSub.unsubscribe();
}
}
