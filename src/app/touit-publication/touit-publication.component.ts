import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TouitPost } from '../_models/TouitPost.model';
import { AuthenticationService } from '../_services/authentication.service';
import { TouitsService } from '../_services/touits.service';

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
    private matDialogRef: MatDialogRef<TouitPublicationComponent>
  ) { }

  ngOnInit(): void {
    this.createTouitPostForm();
  }

  onCloseDialogTouitPost(): void {
    this.matDialogRef.close();
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
    this.touitService.postTouit(touitPost).subscribe(() => this.onCloseDialogTouitPost());
  }
}
