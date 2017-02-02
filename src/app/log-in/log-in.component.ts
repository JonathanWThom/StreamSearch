import { Component, OnInit, NgModule } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [UserService]
})
export class LogInComponent implements OnInit {
  user = null;
  fbUser;
  emailForm: boolean;

  constructor(public af: AngularFire, private us: UserService) {
    this.emailForm = false;
    us.checkForUser().subscribe(user => {
      this.user = user;
      this.fbUser = this.us.getUserFB(this.user);
    });
   }

  ngOnInit() {
  }

  toggleEmail(){
    this.emailForm = !this.emailForm;
  }

  login() {
    this.us.login().then(promise => {
      this.us.findOrMakeUser(this.user);
    });
  }

  logout() {
    this.user = null;
    this.us.logout();
  }
}
