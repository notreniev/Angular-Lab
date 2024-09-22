import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../app/todo/list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../app/todo/add/add.component').then(m => m.AddComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../app/todo/edit/edit.component').then(m => m.EditComponent),
  },
  {
    path: 'delete',
    loadComponent: () =>
      import('../app/todo/delete/delete.component').then(
        m => m.DeleteComponent
      ),
  },
];
