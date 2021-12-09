import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email = '';
  password = '';
  cpassword = '';
  constructor(public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {
  }
  login(){
    this.router.navigateByUrl('login');
  }
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		});

		await alert.present();
	}
  async register() {
    const { email, password, cpassword } = this;
    if (password !== cpassword) {
      this.presentAlert('Password Error !', 'Passwords don\'t match ! ');
      return console.error('Passwords don\'t match');
    }

    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      console.log(res);
      this.email = '';
      this.password = '';
      this.cpassword = '';
      this.presentAlert('Success', 'You are registered!');

    } catch (err) {
      console.dir(err);
    }

  }
}
