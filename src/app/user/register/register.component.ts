import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  
  constructor(private authService: AuthService) {

  }

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl<Number | null>(null, [Validators.required, Validators.min(18), Validators.max(100)]);
  confirm_password = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  phoneNumber = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,

  },[RegisterValidators.match('password','confirm_password')]);

  showAlert = false;
  alertMsg = 'Please Wait! Your account is being created...';
  alertColor = 'blue';
  insubmission = false;

  async register() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please Wait! Your account is being created...';

    this.insubmission = true;
    try {

      await this.authService.creatUser(this.registerForm.value as IUser)

    } catch (e) {
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
