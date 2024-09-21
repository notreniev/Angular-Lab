import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const externalUrlProvider = new InjectionToken(
  'externalUrlRedirectResolver'
);

export const featureRoutes: Routes = [
  {
    path: 'feature1a',
    data: { title: 'feature1', breadcrumb: 'feature1a' },
    loadComponent: () =>
      import('./feature1a/feature1a.component').then(c => c.Feature1aComponent),
  },
  {
    path: 'feature2a',
    data: { title: 'feature2', breadcrumb: 'feature2a' },
    loadComponent: () =>
      import('./../feature2/feature2.component').then(c => c.Feature2Component),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(featureRoutes)],
  exports: [RouterModule],
})
export class Feature1RoutingModule {}
