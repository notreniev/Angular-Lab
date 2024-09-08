import { InjectionToken } from '@angular/core'
import { Routes } from '@angular/router'
import { NotFoundComponent } from './core/components/not-found/not-found.component'

export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver')

export const routes: Routes = [
  {
    path: 'feature1',
    data: { title: 'feature1', breadcrumb: 'feature1' },
    loadChildren: () => import('./features/feature1/feature1-routing.module').then((c) => c.featureRoutes),
  },
  {
    path: 'feature2',
    data: { title: 'feature2', breadcrumb: 'feature2' },
    loadComponent: () => import('./features/feature2/feature2.component').then((c) => c.Feature2Component),
  },
  {
    path: 'feature3',
    data: { title: 'feature3', breadcrumb: 'feature3' },
    loadComponent: () => import('./features/feature3/feature3.component').then((c) => c.Feature3Component),
  },
  {
    path: 'feature4',
    data: { title: 'feature4', breadcrumb: 'feature4' },
    loadComponent: () => import('./features/feature4/feature4.component').then((c) => c.Feature4Component),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'feature1',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
]
