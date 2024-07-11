import { Injectable } from '@angular/core';
import { Ipost } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
   private posts:Ipost[] = [];
   private postsUpdated = new Subject<Ipost[]>()
  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(post: Ipost){
      const newpost:Ipost ={ title : post.title, content : post.content};
      this.posts.push(newpost);
      this.postsUpdated.next([...this.posts])
  }
}
