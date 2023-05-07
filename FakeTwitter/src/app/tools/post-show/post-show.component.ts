import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post/post.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit{
  @Input() postData !: PostData;
  firestore = new FirebaseTSFirestore();
  makerName!: string;
  makerMessage!: string;

  constructor(private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo(){
    this.firestore.getDocument({
      path:["Users", this.postData.userId],
      onComplete: result => {
        let userDocs = result.data();
        this.makerName = userDocs!['worldName'];
        this.makerMessage = userDocs!['info'];
      }
    })
  }

  newReply(){
    this.dialog.open(ReplyComponent, {data: this.postData.postId});
  }
}
