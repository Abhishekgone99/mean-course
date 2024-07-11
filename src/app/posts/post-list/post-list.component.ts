import { NgFor, NgIf } from '@angular/common';
import { Component, Input} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ipost } from '../post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule,NgFor ,NgIf],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

//  posts = [
//   {title: "First Post", content:"This is the first post's content"},
//   {title: "Second Post", content:"This is the second post's content"},
//   {title: "THird Post", content:"This is the third post's content"}
//  ]
@Input()  posts:Ipost[] = [];
}
