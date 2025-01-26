import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementsRoutes } from './product-management.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { DynamicPanelBodyModule } from '../components/dynamic-panel-body/dynamic-panel-body.module';
import { ProductManagementComponent } from './product-management.component';
import { MaintenanceProductComponent } from './maintenance-product/maintenance-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicInputModule } from '../components/dynamic-input/dynamic-input.module';
import { DynamicSelectModule } from '../components/dynamic-select/dynamic-select.module';
import { CustomPropertiesEditorModule } from '../components/custom-properties-editor/custom-properties-editor.module';

@NgModule({
  imports: [
    CommonModule,
    ProductManagementsRoutes,
    FlexLayoutModule,

    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    DynamicPanelBodyModule,

    DynamicInputModule,
    DynamicSelectModule,
    CustomPropertiesEditorModule
  ],

  declarations: [
    ProductManagementComponent,
    MaintenanceProductComponent,
    ViewProductComponent,
    DeleteProductComponent

  ]
})
export class ProductManagementModule { }
