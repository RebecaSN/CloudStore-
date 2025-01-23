import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInOut } from 'src/app/core/services/utilities/animations.service';
import { TableBtn } from '../components/interface/table/table-btn';
import { ProductServiceService } from 'src/app/core/services/pages/product-managment/productService.service';
import { ProductManager } from 'src/app/core/models/pages/product-manager/product-manager';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceProductComponent } from './maintenance-product/maintenance-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.scss'],
  animations: [fadeInOut]
})
export class ProductManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'index',
    'sku',
    'name',
    'price',
    'actions'
  ];

  dataSource: MatTableDataSource<ProductManager>;
  isLoadingResults = false;
  buttons: TableBtn[];


  constructor(
    private productService: ProductServiceService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<ProductManager>();

    this.buttons = [
      {
        styleClass: 'btn btn-success px-2',
        icon: 'fa-edit',
        iconColor: 'rgb(0, 0, 0)',
        payload: (element: ProductManager) => element,
        action: 'edit',
        type: 'btn',
        disable: (element: ProductManager) => false,
        permissionMsg: (element: ProductManager) => '',
        showHidden: (element: ProductManager) => true
      },
      {
        styleClass: 'btn btn-success px-2',
        icon: 'fa-trash',
        iconColor: 'rgb(209, 15, 15)',
        payload: (element: ProductManager) => element,
        action: 'delete',
        type: 'btn',
        disable: (element: ProductManager) => false,
        permissionMsg: (element: ProductManager) => '',
        showHidden: (element: ProductManager) => true
      },
      {
        styleClass: 'btn btn-success px-2',
        icon: 'fa-eye',
        payload: (element: ProductManager) => element,
        action: 'view',
        type: 'btn',
        disable: (element: ProductManager) => false,
        permissionMsg: (element: ProductManager) => '',
        showHidden: (element: ProductManager) => true
      },
    ];
  }

  ngOnInit() {
    this.loadDataSource();
  }

  loadDataSource():void{
    this.productService.getProducts().subscribe(result =>{
      this.dataSource = new MatTableDataSource<ProductManager>(result);

      // Configurar filtros e paginação (se aplicável)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  buttonClick(result): void {
    if (result[0] === 'edit') {
      this.edit(result[1]);
    } else if (result[0] === 'view') {
      this.view(result[1]);
    } else if (result[0] === 'delete') {
      this.delete(result[1]);
    }
  }

  add():void{
    const dialogRef = this.dialog.open(MaintenanceProductComponent, {
      disableClose: true,
      panelClass: 'my-dialog',
      // data: { data: arg }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paginator.firstPage();
      }
    });

  }

  edit(arg: ProductManager):void{
    const dialogRef = this.dialog.open(MaintenanceProductComponent, {
      disableClose: true,
      panelClass: 'my-dialog',
      data: { data: arg }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paginator.firstPage();
      }
    });

  }

  view(arg: ProductManager):void{
    const dialogRef = this.dialog.open(ViewProductComponent, {
      disableClose: true,
      panelClass: 'my-dialog',
      data: { data: arg }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paginator.firstPage();
      }
    });

  }

  delete(arg: ProductManager):void{
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      disableClose: true,
      panelClass: 'my-dialog',
      data: { data: arg }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paginator.firstPage();
      }
    });

  }


}
