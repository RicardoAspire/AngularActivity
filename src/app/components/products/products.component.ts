import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { product } from 'src/app/models/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Array<product> = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'status', 'date'];
  dataSource: MatTableDataSource<any>;
  tableButton = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private productsService:ProductsService
  ) {

    this.productsService.getProducts()
    .subscribe(
      (success)=>{
        for (let i = 0; i < success.length; i++) {
          this.products.push(this.createProductsArray(success[i]));
        }
      },(error)=>{
        console.log(error)
      }
    )
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createProductsArray(data: any): any {  
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      status: data.status,
      date: data.date,
    };
  
  }
}
