import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<RegistrationComponent>) {
  }

  get username(): FormControl {
    return this.form.controls.username;
  }

  get password(): FormControl {
    return this.form.controls.password;
  }

  get email(): FormControl {
    return this.form.controls.email;
  }

  get firstname(): FormControl {
    return this.form.controls.firstname;
  }

  get lastname(): FormControl {
    return this.form.controls.lastname;
  }

  onSubmit(): void {
    const user: User = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      phone: '',
      name: {
        firstname: this.firstname.value,
        lastname: this.lastname.value,
      },
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
          lat: '0',
          long: '0'
        }
      }
    }

    this.dialogRef.close(user);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
