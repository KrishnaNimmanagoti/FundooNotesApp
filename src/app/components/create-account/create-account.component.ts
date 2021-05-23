import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  registerForm!: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.pattern("^[A-Z]{1}[a-z]{2,}"), Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.pattern("^[A-Z]{1}[a-z]{2,}"), Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.pattern("^[a-zA-Z0-9+-]+(?:\\.[a-zA-Z0-9-]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z]{2,}){1,2}$"), Validators.required]],
      password: ['', [Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}'), Validators.required, Validators.minLength(8)]],
      cpassword: ['', Validators.required]

    }, { validator: this.checkPasswords()});
  }

  checkPasswords() {
    return (formgroup: FormGroup) => {
      const control = formgroup.controls['password'];
      const matchingControl = formgroup.controls['cpassword'];
      if (matchingControl.errors && !matchingControl.errors?.mustMatch)
        return
      if (matchingControl.value !== control.value)
        matchingControl.setErrors({ mustMatch: true });
      else
        matchingControl.setErrors(null);

    }
  }

  register = (registerFormValue: { firstname: any; lastname: any; email: any; password: any; }) => {
    try {
      let newUser = {
        firstName: registerFormValue.firstname,
        lastName: registerFormValue.lastname,
        email: registerFormValue.email,
        password: registerFormValue.password,
        service: 'advance'
      }
      console.log(newUser);
      this.userService.registerUser(newUser).subscribe((response: any) => {
        console.log( response);
      })
    } catch (error) {
      console.log(error);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.hasError(errorName, controlName);
  }

  login() {
    this.router.navigate(['login']);
  }

}
