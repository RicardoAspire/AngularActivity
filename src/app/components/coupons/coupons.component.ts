
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { coupon } from 'src/app/models/coupons';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, AfterViewInit {
  coupons: Array<coupon> = [];
  displayedColumns: string[] = ['id', 'couponName', 'couponCode', 'status', 'validDate'];
  dataSource: MatTableDataSource<any>;
  tableButton = false;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private couponservice:ProductsService
  ) {

    this.couponservice.getCoupons()
    .subscribe(
      (success)=>{
        for (let i = 0; i < success.length; i++) {
          this.coupons.push(this.createProductsArray(success[i]));
        }
      },(error)=>{
        console.log(error)
      }
    )
    this.dataSource = new MatTableDataSource(this.coupons);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.paginator)
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
      name: data.couponName,
      code: data.couponCode,
      status: data.status,
      date: data.validDate,
    };
  
  }

}