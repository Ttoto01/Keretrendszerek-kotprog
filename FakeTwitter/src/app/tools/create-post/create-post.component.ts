import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage'
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  imgFile!: File;

  authentication= new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();

  constructor(private dialog: MatDialogRef<CreatePostComponent>){
  }

  imgSelected(photoSelect : HTMLInputElement){
    if(!photoSelect.files){
      return;
    }
    this.imgFile = photoSelect.files[0];
    if(!this.imgFile){
      return;
    }
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.imgFile);
    fileReader.addEventListener("loadend", ev => {
      let string = fileReader.result!.toString();
      let lookImg = <HTMLImageElement> document.getElementById("postLookImg");
      lookImg.src = string;
    })

  }

  postCreate(messageInput: HTMLTextAreaElement){
    let message = messageInput.value;
    if(message.length <= 0){
      return;
    }
    if(this.imgFile){
      this.postWithImg(message);
    }else {
      this.basicPost(message);
    }
    
  }

  postWithImg(message: string){
    let postId = this.firestore.genDocId();
    this.storage.upload({
      uploadName: "upload Image Post",
      path: ["Posts",postId,"img"],
      data: {
        data: this.imgFile
      },
      onComplete: (downloadUrl) => {
        this.firestore.create({
          path: ["Posts",postId],
          data: {
            message: message,
            userId: this.authentication.getAuth().currentUser?.uid,
            imgUrl: downloadUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete: (docId) => {
            this.dialog.close();
          }
        });
      }
    });
  }

  basicPost(message: string){
    this.firestore.create({
      path: ["Posts"],
      data: {
        message: message,
        userId: this.authentication.getAuth().currentUser?.uid,
        timestamp: FirebaseTSApp.getFirestoreTimestamp()
      },
      onComplete: (docId) => {
        this.dialog.close();
      }
    });
  }

}
