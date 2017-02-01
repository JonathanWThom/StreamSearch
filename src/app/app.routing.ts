import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { AboutComponent } from './about/about.component';

import { SearchResultsComponent } from './search-results/search-results.component';
import { LogInComponent } from './log-in/log-in.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: 'show/:id',
    component: TvDetailComponent
  },
  {
    path: 'search/:category/:term/:filter',
    component: SearchResultsComponent
  },
  {
    path: 'account',
    component: LogInComponent
  },
  {
    path: 'person/:id',
    component: ActorDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
