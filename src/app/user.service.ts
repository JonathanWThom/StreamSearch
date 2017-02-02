import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Movie } from './movie.model';
import { Show } from './show.model';
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
  addToFavoriteMovies(movie: Movie, user): void{
    var that = this;
    //get firebase user from authentication data
    this.getUserFB(user).subscribe(fbUser => {
      //get firebase favorites list and update with new movie
      if(!fbUser.favoriteMovies){
        fbUser.favoriteMovies = [];
      }

      //if the list does not already include the new movie
      //push updates to firebase
      var movieExists: boolean = false;
      fbUser.favoriteMovies.forEach(function(foundMovie) {
        if (foundMovie.id === movie.id) {
          movieExists = true;
        }
      })
      if (!movieExists) {
        fbUser.favoriteMovies.push(movie);
        that.af.database.object('/users/' + fbUser.$key).update({
          "favoriteMovies": fbUser.favoriteMovies
        });
      }
    })
  }

  addToFavoriteShows(show: Show, user): void{
    var that = this;
    //get firebase user from authentication data
    this.getUserFB(user).subscribe(fbUser => {
      //get firebase favorites list and update with new movie
      if(!fbUser.favoriteShows){
        fbUser.favoriteShows = [];
      }

      //if the list does not already include the new movie
      //push updates to firebase
      var showExists: boolean = false;
      fbUser.favoriteShows.forEach(function(foundShow) {
        if (foundShow.id === show.id) {
          showExists = true;
        }
      })
      if (!showExists) {
        fbUser.favoriteShows.push(show);
        that.af.database.object('/users/' + fbUser.$key).update({
          "favoriteShows": fbUser.favoriteShows
        });
      }
    })
  }

  removeFromFavoriteMovies(movie: Movie, fbUser): FirebaseObjectObservable<any>{
    var that = this;
    var hasRun: boolean = false;
    if (!fbUser.favoriteMovies) {
      fbUser.favoriteMovies = [];
    }
    for (var movieIndex = 0; movieIndex < fbUser.favoriteMovies.length; movieIndex++) {
      if (fbUser.favoriteMovies[movieIndex].id === movie.id) {
        fbUser.favoriteMovies.splice(movieIndex, 1);
        that.af.database.object('/users/' + fbUser.$key).update({
          "favoriteMovies": fbUser.favoriteMovies
        });
      }
    }
    return that.af.database.object('/users/' + fbUser.$key);
  }
  removeFromFavoriteShows(show: Show, user): void{
    var that = this;
    var hasRun: boolean = false;
    this.getUserFB(user).subscribe(fbUser => {
      if (!fbUser.favoriteShows) {
        fbUser.favoriteShows = [];
      }

      if (!hasRun) {
        for (var showIndex = 0; showIndex < fbUser.favoriteShows.length; showIndex++) {
          if (fbUser.favoriteShows[showIndex].id === show.id) {
            fbUser.favoriteShows.splice(showIndex, 1);
            that.af.database.object('/users/' + fbUser.$key).update({
              "favoriteShows": fbUser.favoriteShows
            });
            hasRun = true
          }
        }
      }
    })
  }
}
