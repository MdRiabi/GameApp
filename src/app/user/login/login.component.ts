import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };
  showAlert = false;
  alertMsg = 'Please Wait! we are logging you in!';
  alertColor = 'blue';
  insubmission = false;
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }
async  login(){
  this.showAlert = true;
    /* console.log(this.credentials); */
    this.insubmission = true;
    try{
     await  this.auth.signInWithEmailAndPassword(this.credentials.email , this.credentials.password) 
    }catch(e){
      console.error(e)
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'red';
      this.insubmission = false;
      return

    }
    this.alertMsg = "Success! Welcome To Your Account.";
    this.alertColor = 'green'
    
  }

}
