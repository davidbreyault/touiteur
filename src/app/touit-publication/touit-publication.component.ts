import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertType } from '../_models/Alert.model';
import { TouitPost } from '../_models/TouitPost.model';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { TouitsService } from '../_services/touits.service';

export class transitedDataModel {
  touitPosted!: boolean;
  alertMessage?: string;
  alertType?: AlertType;
}

@Component({
  selector: 'app-touit-publication',
  templateUrl: './touit-publication.component.html',
  styleUrls: ['./touit-publication.component.scss']
})
export class TouitPublicationComponent implements OnInit {

  touitPostForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private touitService: TouitsService,
    private matDialogRef: MatDialogRef<TouitPublicationComponent>,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createTouitPostForm();
  }

  onCloseDialogTouitPost(transitedData: transitedDataModel = {touitPosted: false}): void {
    this.matDialogRef.close(transitedData);
  }

  createTouitPostForm() {
    this.touitPostForm = this.formBuilder.group({
      username: [this.authenticationService.getAuthenticationData().username],
      message: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]]
    })
  }

  onTouitPublication(): void {
    const touitPost = new TouitPost();
    touitPost.username = this.touitPostForm.value["username"];
    touitPost.message = this.touitPostForm.value["message"];

    if (this.touitPostForm.valid) {
      this.touitService.postTouit(touitPost)
        .subscribe({
          next: () => {
            this.alertService.toggleAppComponentAlertVisibility();
            this.onCloseDialogTouitPost({touitPosted: true, alertMessage: "Your Touit has been posted successfully !", alertType: AlertType.success});
            this.router.navigate(["/login"]);
          },
          error: response => {
            if (response.status === 401 && response.error.msg) {
              this.authenticationService.logout();
              this.router.navigate(["/login"]);
              this.alertService.toggleAppComponentAlertVisibility();
              this.onCloseDialogTouitPost({touitPosted: true, alertMessage: response.error.msg, alertType: AlertType.error});
            } else {
              this.alertService.error("An error occured !");
            }
          }
        });
    }
  }

  isTouitPostFormValid(): boolean {
    return this.touitPostForm?.valid;
  }
}