import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentDate: any;
  myTask = '';
  addTask: boolean;
  constructor(public afDB: AngularFireDatabase) {
    this.currentDate = Date.now();
  }

  ngOnInit() {
  }
  addTaskToFirebase(){
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }
}
