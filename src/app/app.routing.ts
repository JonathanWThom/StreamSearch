import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchResultsComponent } from './search-results/search-results.component';

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
    path: 'search/:category/:term',
    component: SearchResultsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
