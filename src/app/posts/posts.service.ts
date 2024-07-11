import { Injectable } from '@angular/core';
import { Ipost } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
   private posts:Ipost[] = [];
   private postsUpdated = new Subject<Ipost[]>()

  constructor(private http:HttpClient) { }

  getPosts(){
    this.http.get<{message:string, posts:Ipost[]}>('http://localhost:3000/api/posts').subscribe((postData)=>{
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(post: Ipost){
      const newpost:Ipost ={id: post.id, title : post.title, content : post.content};
      this.http.post<{message:string}>('http://localhost:3000/api/posts',newpost).subscribe((responseData)=>{
        console.log(responseData.message);
        this.posts.push(newpost);
      this.postsUpdated.next([...this.posts])
      })
      
  }
}
