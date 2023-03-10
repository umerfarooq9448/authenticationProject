import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user:any=[]
  fullname:string="";
  role:string=""
  constructor(private service:ServiceService,private apiservice:ApiserviceService,private userStore:UserStoreService) { }


  ngOnInit(): void {
    this.apiservice.getAllUsers().subscribe(
      (resp)=>{
        this.user = resp
        console.log(resp)
      }
    )

      this.userStore.getFullNameFromStore().subscribe(val=>{
        console.log(val)
        let fullnameFromToken = this.service.getFullNameFromToken();
        this.fullname = val || fullnameFromToken
      })

      this.userStore.getRoleFromStore().subscribe(val=>{
        let roleFormToken = this.service.getRoleFromToken();
        console.log(roleFormToken)
        this.role = val || roleFormToken      })


 
  }

  logout(){
    this.service.signOut()
  }
}
