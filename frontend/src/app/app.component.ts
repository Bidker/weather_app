import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalRegistrationComponent} from './modal_registration/modal-registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  title = 'Weather';
  isLoggingError = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public matDialog: MatDialog,
    public authService: AuthService,
  ) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.refreshToken()
      .subscribe(this.authService.successLogin, (error) => {console.error(error); });
  }

  login = () => {
    const val = this.form.value;
    this.isLoggingError = false;

    if (this.form.valid) {
      this.authService.login(val)
        .subscribe(this.authService.successLogin, this.errorLogin);
    }
  }

  errorLogin = () => {
    this.isLoggingError = true;
  }

  openModal = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal_registration-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    this.matDialog.open(ModalRegistrationComponent, dialogConfig);
  }
}
