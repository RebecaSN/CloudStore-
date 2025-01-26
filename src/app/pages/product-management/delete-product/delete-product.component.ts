import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/pages/product-managment/productService.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<DeleteProductComponent>,
   private toastr: ToastrService,
   private productService: ProductService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  confirm(): void {
    const productId = this.data.id;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.toastr.success('Product successfully deleted!', 'Success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toastr.error('Error deleting product!', 'Error');
        this.dialogRef.close(false);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }


}
