import { Injectable } from '@angular/core';
import { Ipost } from './post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
   private posts:Ipost[] = [];
   private postsUpdated = new Subject<{posts: Ipost[], postCount: number}>()

  constructor(private http:HttpClient, private router:Router) { }

  getPosts(postsPerPage:number,currentPage:number){
    const querParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http.get<{message:string, posts:any,maxPosts:number}>('http://localhost:3000/api/posts' + querParams)
    .pipe(map(postData =>{
      return {posts: postData.posts.map((post) =>{
        return {
          title: post.title,
          content:post.content,
          id:post._id,
          imagePath: post.imagePath
        }
      }), maxPosts : postData.maxPosts
    }
    }))
    .subscribe((transformedPostsData)=>{
      this.posts = transformedPostsData.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostsData.maxPosts })
    })
  }

  getPost(id: string){
    // return {...this.posts.find(p => p.id === id)};
    return  this.http.get<{_id:string,title:string,content:string,imagePath:string}>('http://localhost:3000/api/posts/' + id)
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string , image: File){
      const postData = new FormData();
      postData.append('title',title);
      postData.append('content',content);
      postData.append('image',image, title)
      this.http.post<{message:string,post: Ipost}>('http://localhost:3000/api/posts',postData).subscribe((responseData)=>{
        this.router.navigate(['/']);
      })
  }

  updatePost(id:string, title:string, content:string, image: any){
    let postData: Ipost | FormData;
    if(typeof image === 'object'){
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    }else{
      postData = {
        id : id,
        title: title,
        content : content,
        imagePath : image
      } 
    };

    this.http.put('http://localhost:3000/api/posts/' + id, postData).subscribe((response)=>{
    this.router.navigate(["/"])
    })
  }

  deletePost(postId: any){
     return  this.http.delete('http://localhost:3000/api/posts/'+ postId);
  }
}
