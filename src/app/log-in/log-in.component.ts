import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
user = {};
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        console.log(this.user);
      } else {
        //user not logged in
        this.user = {};
      }
    })
   }

  ngOnInit() {
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    })
  }

  logout() {
    this.af.auth.logout();
  }
}
