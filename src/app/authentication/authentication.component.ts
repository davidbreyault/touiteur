import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models/User.model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  authenticationForm!: FormGroup;
  hidePasswordCharacters: boolean = true;
  userAuthenticationError!: string | null;
  subscription!: Subscription;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authenticationService.getAuthenticationData().isAuthenticated) {
      this.router.navigateByUrl("/");
    }
    this.createAuthenticationForm();
  }

  createAuthenticationForm(): void {
    this.authenticationForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.minLength(3)]
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(8)]
      ]
    })
  }

  onLogin(): void {
    if (this.authenticationForm?.valid) {
      const user = new User();
      const { username, password } = this.authenticationForm.value;
      user.username = username;
      user.password = password;
      this.subscription = this.authenticationService.login(user)
        .subscribe({
          next: () => this.router.navigateByUrl("/"),
          error: response => {
            const { error } = response.error;
            this.userAuthenticationError = error
              ? error 
              : "(Error " + response.status + "). An error has occurred !";
          }
        })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}