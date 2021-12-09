import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: any;
  myTask: string;
  addTask: boolean;
  tasks = [];
  uid: string;

  constructor(
    public afBD: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  public router: Router
  ) {
      const date = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric' }as const;
      this.currentDate = date.toLocaleDateString('fr-FR', options);
      this.afAuth.authState.subscribe(user => {
        this.uid = user.uid; // connected user ID
        //console.log (this.uid)
      });
  }

  addTaskToFireBase(){
    this.afBD.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }

  showForm(){
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  getTasks(){
    this.afBD.list('Tasks/').snapshotChanges(['child_added','child_removed']).subscribe(actions=>{
      actions.forEach(action=>{
        console.log('Task: '+ action.payload.exportVal().text);
        this.tasks.push({
          key: action.key,
          date:action.payload.exportVal().date.substring(11,16),
          text: action.payload.exportVal().text,
          checked: action.payload.exportVal().checked
        });
      });
    });
  }

  changeCheckState(task: any){
    this.afBD.object('Tasks/' + task.key + '/checked').set(task.checked);
  }
  deleteTask(task: any){
    this.afBD.list('Tasks/').remove(task.key);
  }
  async logout(){
  await this.afAuth.signOut();
  this.uid = '';
  this.router.navigateByUrl('login');
}
}
