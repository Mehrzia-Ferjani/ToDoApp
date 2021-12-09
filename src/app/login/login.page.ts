import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email='';
  password='';
  constructor(public afAuth: AngularFireAuth,
    public router: Router) { }

  ngOnInit() {
  }
  register(){
    this.router.navigateByUrl('register');
  }
 async login(){
    const {email,password}=this;
    try{
        const res=await this.afAuth.signInWithEmailAndPassword(email ,password);
        console.log(res);
        this.email = '';
      this.password = '';
    }catch(err){
      console.log(err);
      if(err.code==='auth/user-not-found'){
        console.log('user  not found');
      }
    }

  }
}
