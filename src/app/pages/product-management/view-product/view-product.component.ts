import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductManager } from 'src/app/core/models/pages/product-manager/product-manager';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductManager,
    public dialogRef: MatDialogRef<ViewProductComponent>,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

}
