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
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Ipost } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    NgFor,
    NgIf,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Ipost[] = [];
  isLoading: boolean = false;
  totalPosts = 0;
  currentPage = 1;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription = new Subscription();
  private authStatusSubs: Subscription;
  userIsAuthenticated: boolean = false;
  userId: string;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Ipost[]; postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(postId: any) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.isLoading = true;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    console.log(pageData);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
}
