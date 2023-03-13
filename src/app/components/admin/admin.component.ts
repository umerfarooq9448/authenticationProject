import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


import { ApiserviceService } from 'src/app/services/apiservice.service';
import { MatInput } from '@angular/material/input';
import { from } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:any;

  public dataSource!: MatTableDataSource<any>;
  displayedColumns: string[]=['id',"firstName","lastName", "username","email","Operations"]


  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service:ApiserviceService){}
  ngOnInit():void{
    this.getAllUsers()
  }

  getAllUsers(){
    this.service.getAllUsers().subscribe((resp)=>{
      this.users = resp
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  




}


