import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform!:FormGroup
  user:User={
    Id:0,

     FirstName  :"",
     LastName  :"",

     Username  :"",
     Email  :"",
     Password  :"",
     Token :"",
     Role  :""
}
  constructor(private service:ServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  public onSubmit(){
    this.service.register(this.user).subscribe((resp)=>{
      console.log(resp)
      this.router.navigate(['login']);
    })

  }

}
