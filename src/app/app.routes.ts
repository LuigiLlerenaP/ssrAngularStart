import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact'),
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons'),
  },
  {
    path: 'pokemons-details/:id',
    loadComponent: () => import('./pages/pokemon-details/pokemon-details'),
  },
  {
    path: '**',
    redirectTo: () => 'about',
  },
];
