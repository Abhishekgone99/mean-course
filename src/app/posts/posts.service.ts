import { Injectable } from '@angular/core';
import { Ipost } from './post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
   private posts:Ipost[] = [];
   private postsUpdated = new Subject<Ipost[]>()

  constructor(private http:HttpClient) { }

  getPosts(){
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map(postData =>{
      return postData.posts.map((post: { title: any; content: any; _id: any; }) =>{
        return {
          title: post.title,
          content:post.content,
          id:post._id
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string){
      const newpost:Ipost = { title : title, content :content};
      this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',newpost).subscribe((responseData)=>{
        console.log(responseData.message);
        const id = responseData.postId;
        console.log("id",id);
        newpost.id = id;
        this.posts.push(newpost);
        this.postsUpdated.next([...this.posts])
      })
  }

  deletePost(postId: any){
       this.http.delete('http://localhost:3000/api/posts/'+ postId).subscribe((result)=>{
        const updatedPosts = this.posts.filter(post => post.id !== postId)
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts])
        console.log("deleted",result);
       })
  }
}
