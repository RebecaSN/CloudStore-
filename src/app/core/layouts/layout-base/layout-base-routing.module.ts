
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductManagementComponent } from 'src/app/pages/product-management/product-management.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../pages/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  {
    path: 'product-management',
    canActivate: [AuthGuard],
    component: ProductManagementComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../pages/product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutBaseRoutingModule { }
