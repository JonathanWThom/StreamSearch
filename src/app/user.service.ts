import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders } from 'angularfire2';

@Injectable()
export class UserService {
  users: any = [];
 constructor(private af: AngularFire) {
   this.users = af.database.list('/users');
 }

 login() {
  return this.af.auth.login({
     provider: AuthProviders.Google
   })
 }

 logout() {
   console.log('got in to log out function');
   return this.af.auth.logout();
 }

  findOrMakeUser(user: any) {
    this.users.subscribe(users => {
      for(var i = 0; i < users.length; i++) {
        if(users[i].uid === user.google.uid) {
          return;
        }
      }
      var newUser = new User(user.google.uid, user.google.displayName, user.google.photoURL);
      this.users.push(newUser);
    })

}
}
//   this.users.subscribe(users => {
//   //
// });
//   for (var i = 0; i < users.length; i++) {
//     if(users[i].uid === inputtedUser.uid) {
//       return;
//     }
//   }
//   var newUser = new User(inputtedUser.google.uid, inputtedUser.google.displayName, inputtedUser.google.photoURL);
//   this.users.push(newUser);
// });
