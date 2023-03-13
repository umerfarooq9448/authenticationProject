import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any=[]
  fullname:string="";
  role:string=""
  logstatus:boolean=false;
  constructor(private service:ServiceService,private apiservice:ApiserviceService,private userStore:UserStoreService) { }


  ngOnInit(): void {
    
      this.loggedId();

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
    this.logstatus = false;
    this.service.signOut()

    
  }

  loggedId(){
   this.logstatus = this.service.isLoggedIn()
   
  }

}
