import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { users } from 'src/app/models/users';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,AfterViewInit {
  users: Array<users> = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'status', 'date'];
  dataSource: MatTableDataSource<any>;
  tableButton = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private usersService:ProductsService
  ) {

    this.usersService.getUsers()
    .subscribe(
      (success)=>{
        console.log(success)
        for (let i = 0; i < success.length; i++) {
          this.users.push(this.createProductsArray(success[i]));
        }
      },(error)=>{
        console.log(error)
      }
    )
    this.dataSource = new MatTableDataSource(this.users);
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
      username: data.username,
      email: data.email,
      status: data.status,
      date: data.date,
    };
  
  }
}
