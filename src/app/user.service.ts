import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders } from 'angularfire2';

@Injectable()
export class UserService {
  users: any = [];
  user;
 constructor(private af: AngularFire) {
   this.users = af.database.list('/users');
 }

 login() {
  return this.af.auth.login({
     provider: AuthProviders.Google
   })
 }

 logout() {
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

  checkForUser(){
    return this.af.auth.map(user => {
      if(user) {
        return user;
        ///check to see if user already exists with service
        // ;
      } else {
        //user not logged in
        return null;
      }
    })
  }

  getUserFB(user): FirebaseObjectObservable<any> {
    return this.users.map(usersFB => {
      var userFB: FirebaseObjectObservable<any>;
      usersFB.forEach(function(fBUser) {
        if (fBUser.uid === user.google.uid) {
          userFB = fBUser;
        }
      })
      return userFB;
    })
  }

  //take user authentication data and movie id and add to firebase user favorites list
  addToFavorites(movieId: string, user): void{
    var that = this;
    //get firebase user from authentication data
    this.getUserFB(user).subscribe(fbUser => {

      //get firebase favorites list and update with new movie
      var favorites;
      if(fbUser.favoriteMovies){
        favorites = fbUser.favoriteMovies;
      } else {
        favorites = [];
      }

      //if the list does not already include the new movie
      //push updates to firebase
      if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        fbUser.favoriteMovies = favorites;
        that.af.database.object('/users/' + fbUser.$key).update({
          "favoriteMovies": fbUser.favoriteMovies
        });
      }
    })

    // var userFB = this.af.database.object('/users/' + userKey);
    // userFB.update({
    //   "favoriteMovies": userFB.favoriteMovies.push(movieId)
    // });
    // this.users.forEach(function(usersFB) {
    //   usersFB.forEach(function(userFB) {
    //     if (userFB.uid === user.google.uid) {
    //       console.log(userFB);
    //       if (!userFB.favoriteMovies) {
    //         userFB['favoriteMovies'] = [];
    //       }
    //       console.log(userFB.favoriteMovies);
    //       userFB.favoriteMovies.push(movieId);
    //       that.af.database.object('/users/' + userFB.$key).update({
    //         "favoriteMovies": userFB.favoriteMovies
    //       })
    //     }
    //   })

    // })


    // this.users.subscribe(users => {
    //   for(var i=0; i < users.length; i++) {
    //     if(users[i].uid === user.google.uid) {
    //       if (!users[i].favoriteMovies){
    //         users[i]['favoriteMovies'] = [];
    //         console.log(users[i]['favoriteMovies']);
    //       }
    //       users[i].favoriteMovies.push(movieId);
    //       console.log(users[i].favoriteMovies);
    //       this.users = users;
    //       this.af.database.object('/users/' + users[i].$key).update({
    //         "favoriteMovies": users[i].favoriteMovies
    //       });
    //       return;
    //     } else {
    //       console.log("User Log In Error");
    //     }
    //   }
    //   return;
    // });
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
