import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './core/layouts/layout-base/layout-base.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('src/app/pages/auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/core/layouts/layout-base/layout-base.module').then(
            (m) => m.LayoutBaseModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
