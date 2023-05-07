import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit{

  firestore= new FirebaseTSFirestore();
  comments: Comment [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private postId: string){

  }

  ngOnInit(): void {
    this.getComments();
  }

  isCommentMaker(comment: Comment ){
    try{
      return comment.userId == AppComponent.getUserInformations().userId;
    }catch(err){
      return false;
    }
    
  }

  getComments(){
    this.firestore.listenToCollection({
      name: "Post Comments",
      path: ["Posts", this.postId,"PostComment"],
      where: [new OrderBy("timestamp", "asc")],
      onUpdate: (result) =>{
        result.docChanges().forEach(
          postCommentDoc => {
            if(postCommentDoc.type == "added"){
              this.comments.unshift(<Comment>postCommentDoc.doc.data());
            }
          }
        )
      }
    });
  }

  newComment(comment: HTMLInputElement){
    if(!(comment.value.length > 0)){
      return;
    }
    this.firestore.create({
      path: ["Posts", this.postId, "PostComment"],
      data: {
        comment: comment.value,
        userId: AppComponent.getUserInformations().userId,
        userName: AppComponent.getUserInformations().worldName,
        timestamp: FirebaseTSApp.getFirestoreTimestamp()
      },
      onComplete: (docId) =>{
        comment.value="";
      }
    })
  }
}

export interface Comment{
  userId: string;
  userName: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp
}
