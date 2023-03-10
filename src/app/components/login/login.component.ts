import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { ServiceService } from 'src/app/services/service.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginform!:FormGroup

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

  response={
    message:"",
    token:""
  }

  name:string="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  role:string="http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  constructor(private fb:FormBuilder, private service:ServiceService, private router:Router,private userStore:UserStoreService) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }


  //this code is used for validations and login
  onLogin(){
    if(this.loginform.valid){
      
      this.user.Username = this.loginform.value.username
      this.user.Password = this.loginform.value.password
      console.log(this.user)
      // send the object to database
      this.service.login(this.user).subscribe((resp)=>{
        console.log(resp.message)
        
        
        this.loginform.reset()
        this.service.storeToken(resp.token);
        const tokenPayload = this.service.decodedToken()
        
        this.userStore.setFullnameForStore(tokenPayload[this.name])
        this.userStore.setRoleForStore(tokenPayload[this.role])
        
        
        this.router.navigate(['dashboard'])
        
        
      }
      )

    }else{
      //throw an error using toaster and required field
      console.log("form is not valid")
      this.validateAllFormFields(this.loginform)
      console.log("form is invalid")
    }
  }

  private validateAllFormFields(formgroup:FormGroup){
    Object.keys(formgroup.controls).forEach(field=>{
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }



  
  

}
