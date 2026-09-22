import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
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
    path: '**',
    redirectTo: (()=> 'about'),
  },
];
