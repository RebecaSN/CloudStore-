import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPropertiesEditorComponent } from './custom-properties-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,

    NgxMaskModule.forChild(),
    NgxCurrencyModule
  ],
  declarations: [CustomPropertiesEditorComponent],
  exports: [CustomPropertiesEditorComponent],
})
export class CustomPropertiesEditorModule { }
