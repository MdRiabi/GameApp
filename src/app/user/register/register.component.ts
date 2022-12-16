import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  insubmission = false;
constructor(private auth: AngularFireAuth){

}

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required,Validators.email]);
  age = new FormControl('', [Validators.required,Validators.min(18),Validators.max(100)]);
  confirm_password = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  phoneNumber = new FormControl('',[ Validators.required,Validators.minLength(13),Validators.maxLength(13)]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,

  });

  showAlert = false;
  alertMsg = 'Please Wait! Your account is being created...';
  alertColor = 'blue';

  async register(){
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please Wait! Your account is being created...';
    const {email,password} = this.registerForm.value;
    this.insubmission = true;
    try{
      const userCred = await this.auth.createUserWithEmailAndPassword(email   , password )
    }catch(e){
      console.error(e)
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'red';
      this.insubmission = false;
      return
    }
    this.alertMsg = "Success! Your account has been created.";
    this.alertColor = 'green'


  }
}
