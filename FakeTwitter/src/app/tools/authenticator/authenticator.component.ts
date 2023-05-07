import { Component, OnInit} from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef){
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void{

  }

  registerCard(){
    this.state=AuthenticatorCompState.REGISTER;
  }

  loginCard(){
    this.state=AuthenticatorCompState.LOGIN;
  }

  isLogin(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegister(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  headerText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login"
      case AuthenticatorCompState.REGISTER:
        return "Register"
    }
  }

  registerClick(registerEmail: HTMLInputElement, registerPswd: HTMLInputElement, registerCPswd: HTMLInputElement){
    let email = registerEmail.value;
    let pswd = registerPswd.value;
    let cpswd = registerCPswd.value;

    if(this.notEmpty(email) && this.notEmpty(pswd) && this.notEmpty(cpswd) && this.stingMatch(pswd,cpswd)){
      this.firebasetsAuth.createAccountWith({
        email: email,
        password: pswd,
        onComplete: (uc) =>{
          this.bottomSheetRef.dismiss();
        },
        onFail: (err) =>{
          alert("Failed creating an account.");
        }
      });
    }
    
  }

  notEmpty(text: string){
    return text !=null && text.length > 0;
  }

  stingMatch(text: string, anotherOne: string){
    return text == anotherOne;
  }

  loginClick(loginEmail: HTMLInputElement, loginPswd:HTMLInputElement){
    let email = loginEmail.value;
    let pswd = loginPswd.value;
    if(this.notEmpty(email) && this.notEmpty(pswd)){
      this.firebasetsAuth.signInWith({
        email: email,
        password: pswd,
        onComplete: (uc) => {
          this.bottomSheetRef.dismiss();
        },
        onFail: (err) => {
          alert(err);
        }
      })
    }
  }

}



export enum AuthenticatorCompState{
  LOGIN,
  REGISTER
}
