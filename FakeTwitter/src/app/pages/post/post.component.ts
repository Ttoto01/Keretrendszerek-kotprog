import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  firestore = new FirebaseTSFirestore();
  posts: PostData [] =[];
  constructor(private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.getPosts();
  }


  newPost(){
    this.dialog.open(CreatePostComponent);
  }

  getPosts(){
    this.firestore.getCollection({
      path: ["Posts"],
      where:[
        new OrderBy("timestamp","desc"),
        new Limit(10)
      ],
      onComplete: (result) =>{
        result.docs.forEach(doc => {
          let post = <PostData> doc.data();
          post.postId = doc.id;
          this.posts.push(post);
        })
      },
      onFail: err => {

      }
    })
  }
}

export interface PostData{
  message: string;
  userId: string;
  imgUrl?: string;
  postId: string;
}
