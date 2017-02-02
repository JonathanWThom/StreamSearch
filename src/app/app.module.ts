import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { LogInComponent } from './log-in/log-in.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailComponent,
    SearchComponent,
    SearchResultsComponent,
    LogInComponent,
    ActorDetailComponent,
    UserFavoritesComponent,
    TvDetailComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
