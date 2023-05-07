import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FakeTwitter';
  authentication = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userWithProfile = true;
  private static userInformations:any;

  constructor(private loginSheet: MatBottomSheet, private router: Router){
    this.authentication.listenToSignInStateChanges(
      user => {
        this.authentication.checkSignInState({
          whenSignedIn: user => {
            this.userProfile();
          },
          whenSignedOut: user => {
            AppComponent.userInformations = null;
            this.router.navigate(["home"]);
          },
          whenChanged: user =>{

          }
        });
      }
    );
  }

  loggedIn(){
    return this.authentication.isSignedIn();
  }

  letsGoClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }

  logoutClick(){
    this.authentication.signOut();
  }

  public static getUserInformations(){
    return AppComponent.userInformations;
  }

  getUsername(){
    try{
      return AppComponent.userInformations.worldName;
    }catch (err){

    }
  }

  userProfile(){
    this.firestore.listenToDocument({
      name: "Informations",
      path: ["Users", this.authentication.getAuth().currentUser!.uid],
      onUpdate: (result) =>{
        AppComponent.userInformations = result.data();
        this.userWithProfile = result.exists;
        AppComponent.userInformations.userId = this.authentication.getAuth().currentUser!.uid;
        if(this.userWithProfile){
          this.router.navigate(["post"]);
        }
      }
    });
  }
}



