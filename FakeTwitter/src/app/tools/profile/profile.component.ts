import { Component, Input } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  @Input() show: boolean = true;

  firestore: FirebaseTSFirestore;
  authentication: FirebaseTSAuth;

  constructor(){
    this.firestore = new FirebaseTSFirestore();
    this.authentication = new FirebaseTSAuth();
  }

  finishClick(username: HTMLInputElement, userinfo: HTMLTextAreaElement){
    let name = username.value;
    let info = userinfo.value;
    this.firestore.create({
      path:["Users", this.authentication.getAuth().currentUser!.uid],
      data:{
        worldName: name,
        info: info
      },
      onComplete: (docId) => {
        alert("Profile done");
        username.value="";
        userinfo.value="";
      },
      onFail: (err) =>{

      }
    });
  }
}
