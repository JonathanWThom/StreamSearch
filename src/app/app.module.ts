import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
// import { movieKey } from './api-keys';
// 
// export const apiKey = {
//   movieKey: movieKey.key
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
