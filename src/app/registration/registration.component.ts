import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../shared/custom-validators';
import { AuthenticationService } from '../_services/authentication.service';
import { RegistrationService } from '../_services/registration.service';
import { User } from '../_models/User.model';
import { UserRegister } from '../_models/UserRegister.model';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registrationForm!: FormGroup;
  hidePasswordCharacters: boolean = true;
  hideConfimationCharaters: boolean = true;
  subscription!: Subscription;
  customValidators = CustomValidators;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService, 
    private registrationService: RegistrationService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authenticationService.getAuthenticationData().isAuthenticated) {
      this.router.navigateByUrl("/");
    }
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(16)]
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(8)]
      ],
      confirmation: [
        null,
        [Validators.required, Validators.minLength(8)]
      ]
    }, { validators: CustomValidators.passwordConfirmationValidator });
  }

  onRegister() {
    if (this.registrationForm && this.registrationForm.valid) {
      const user = new User();
      const { username, password } = this.registrationForm.value;
      user.username = username;
      user.password = password;

      this.subscription = this.registrationService.registrationRequestLauncher(user)
        .subscribe({
          next: (response: UserRegister) => {
            if (response.success) {
              this.registrationForm.reset();
              // Retire les erreurs sur les champs apr??s soumission et reset
              Object.keys(this.registrationForm.controls).map(field => this.registrationForm.controls[field].setErrors(null));
              this.alertService.success("Your account has been created successfully !");
            }
          },
          error: response => {
            const { error } = response.error;
            this.alertService.error(error ? error : "(Error " + response.status + "). An error has occurred !");
          }
        })
    }
  }

  isRegistrationFormValid(): boolean {
    return this.registrationForm?.valid;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
