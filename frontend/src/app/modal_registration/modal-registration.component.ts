import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.css']
})
export class ModalRegistrationComponent implements OnInit {
  isRegistrationError = false;
  registrationErrorNotes: object;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ModalRegistrationComponent>
  ) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  ngOnInit = () => {
  }

  register = () => {
    const val = this.form.value;
    this.isRegistrationError = false;
    this.registrationErrorNotes = undefined;

    if (this.form.valid) {
      this.authService.register(val)
        .subscribe((response) => {
            this.authService.successLogin(response);
            this.closeModal();
          },
          this.errorRegistration
        );
    }
  }

  closeModal = () => {
    this.dialogRef.close();
  }
  errorRegistration = (error: object) => {
    this.isRegistrationError = true;
    // @ts-ignore
    this.registrationErrorNotes = (error.hasOwnProperty('error')) ? error.error : undefined;
  }
}
