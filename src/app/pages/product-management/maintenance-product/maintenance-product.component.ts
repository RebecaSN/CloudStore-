import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductManager } from 'src/app/core/models/pages/product-manager/product-manager';
import { Profile } from 'src/app/core/models/pages/product-manager/profile';

@Component({
  selector: 'app-maintenance-product',
  templateUrl: './maintenance-product.component.html',
  styleUrls: ['./maintenance-product.component.scss']
})
export class MaintenanceProductComponent implements OnInit {

  productFormGroup: FormGroup;
  typeData: Profile[] = [
    { type: 'furniture' },
    { type: 'equipment' },
    { type: 'stationary' },
    { type: 'part' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductManager,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MaintenanceProductComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createFormGroup(this.data);
  }

  createFormGroup(data?: ProductManager): void {
    this.productFormGroup = this.formBuilder.group({
      // Text fields for name and description
      name: [data?.name || '', [Validators.required, Validators.maxLength(100)]],

      description: [data?.description || '', [Validators.required, Validators.maxLength(255)]],

      // Cost: numeric input with 2 decimal places
      cost: [data?.cost || '', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],

      // Profile fields
      profile: this.formBuilder.group({
        // Type: dropdown list with predefined values
        type: [data?.profile?.type || 'furniture', [Validators.required]],

        // Available: checkbox
        available: [data?.profile?.available ?? true, [Validators.required]],

        // Backlog: number input (spin box)
        backlog: [data?.profile?.backlog || null, [Validators.pattern('^[0-9]*$')]],
      }),

    });
  }


  update(): void {
    alert('Product updated.');
  }

  public getFormControl(ctrl: string): FormControl {
    return this.productFormGroup.get(ctrl) as FormControl;
  }


}
