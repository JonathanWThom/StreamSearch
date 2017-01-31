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
  addToFavoriteMovies(movieId: string, user): void{
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
  }

  removeFromFavorites(movieId: string, user): void{
    var that = this;
    //get firebase user from authentication data
    this.getUserFB(user).subscribe(fbUser => {
      if (fbUser.favoriteMovies.includes(movieId)) {
        var movieIndex = fbUser.favoriteMovies.indexOf(movieId);
        fbUser.favoriteMovies.splice(movieIndex, 1);
        that.af.database.object('/users/' + fbUser.$key).update({
          "favoriteMovies": fbUser.favoriteMovies
        });
      }
    })
  }
}
