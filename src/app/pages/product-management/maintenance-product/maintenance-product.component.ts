import { ChangeDetectorRef, Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { ToastrService } from 'ngx-toastr';
import { ProductManager } from 'src/app/core/models/pages/product-manager/product-manager';
import { Profile } from 'src/app/core/models/pages/product-manager/profile';
import { ProductService } from 'src/app/core/services/pages/product-managment/productService.service';

@Component({
  selector: 'app-maintenance-product',
  templateUrl: './maintenance-product.component.html',
  styleUrls: ['./maintenance-product.component.scss']
})
export class MaintenanceProductComponent implements OnInit {

  productFormGroup: FormGroup;

  payValueCurrencyMaskOptions: {};
  objectData: ProductManager
  typeData: Profile[] = [
    { type: 'furniture' },
    { type: 'equipment' },
    { type: 'stationary' },
    { type: 'part' }
  ];;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductManager,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MaintenanceProductComponent>,
    private formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private productService: ProductService,
    private toastr: ToastrService,
  ) {
    this.payValueCurrencyMaskOptions = {
      align: 'left',
      allowNegative: false,
      allowZero: true,
      decimal: ',',
      precision: 2,
      prefix: '',
      suffix: '',
      thousands: '.',
      nullable: true,
      min: null,
      max: null,
      inputMode: CurrencyMaskInputMode.NATURAL
    };
   }

  ngOnInit() {
    this.createFormGroup(this.data);
    console.log(this.data);

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 0);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  createFormGroup(data?: ProductManager): void {
    const customPropertiesArray = data?.profile
    ? Object.keys(data.profile)
        .filter(key => !['type', 'backlog', 'available'].includes(key)) // Exclui as propriedades padrão
        .map(key => ({ key, value: data.profile[key] }))
    : [];

    this.productFormGroup = this.formBuilder.group({
      name: [data?.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [data?.description || '', [Validators.required, Validators.maxLength(255)]],
      cost: [data?.cost || '', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      sku: [data?.sku || '', [Validators.required, Validators.maxLength(100)]],

      profile: this.formBuilder.group({//
      type: [data?.profile?.type || 'furniture', [Validators.required]],
      backlog: [data?.profile?.backlog || null, [Validators.pattern('^[0-9]*$')]],
      available: [data?.profile?.available ?? true, [Validators.required]],

      customProperties: this.formBuilder.array(
        customPropertiesArray.map(prop => this.createCustomPropertyGroup(prop)) || []
      ),
    }),
  });
  }

  createCustomPropertyGroup(property?: { key: string; value: string }): FormGroup {
    return this.formBuilder.group({
      key: [property?.key || '', [Validators.required]],
      value: [property?.value || '', [Validators.required]],
    });
  }

  get customProperties(): FormArray {
    return this.productFormGroup.get('profile.customProperties') as FormArray;
  }

  addCustomProperty(): void {
    this.customProperties.push(this.createCustomPropertyGroup());
  }

  removeCustomProperty(index: number): void {
    this.customProperties.removeAt(index);
  }

  public getFormControl(ctrl: string): FormControl {
    return this.productFormGroup.get(ctrl) as FormControl;
  }

  save(): void {
    const customProperties = this.productFormGroup.get('profile.customProperties').value.reduce((acc, property) => {
      if (property.key && property.value) {
        acc[property.key] = property.value;
      }
      return acc;
    }, {});

    if(this.data !== null){
      this.objectData = {
        name: this.productFormGroup.get('name').value,
        description: this.productFormGroup.get('description').value,
        cost: this.productFormGroup.get('cost').value,

        profile: {
          type: this.productFormGroup.get('profile').get('type').value,
          backlog: this.productFormGroup.get('profile').get('backlog').value,
          available: this.productFormGroup.get('profile').get('available').value,
          ...customProperties
        }
      }

    }else{
      this.objectData = {
        name: this.productFormGroup.get('name').value,
        description: this.productFormGroup.get('description').value,
        cost: this.productFormGroup.get('cost').value,
        sku: this.productFormGroup.get('sku').value,

        profile: {
          type: this.productFormGroup.get('profile').get('type').value,
          backlog: this.productFormGroup.get('profile').get('backlog').value,
          available: this.productFormGroup.get('profile').get('available').value,
          ...customProperties
        }
      }
    }

    console.log(this.objectData);

    if(this.data === null ){
      this.productService.createProduct(this.objectData).subscribe({
        next: (result) => {
          if (result) {
            this.toastr.success('Product successfully created!', 'Success');
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          this.toastr.error('An error occurred while creating the product. Please try again.', 'Error'+ err.message);
        }
      });

    }else{
      this.productService.editProduct(this.data.id, this.objectData).subscribe({
        next: (result) => {
          if (result) {
            this.toastr.success('Product successfully updated!', 'Success');
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          this.toastr.error('An error occurred while updating the product. Please try again.', 'Error: ' + err.message);
        }
      });
    }
  }


}
