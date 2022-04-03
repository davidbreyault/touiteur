import { Component, OnInit } from '@angular/core';
import { Touit } from '../models/Touit.model';
import { TouitsService } from '../services/touits.service';

@Component({
  selector: 'app-touits-list',
  templateUrl: './touits-list.component.html',
  styleUrls: ['./touits-list.component.scss']
})
export class TouitsListComponent implements OnInit {

  wheel!: boolean;
  touitsList!: Touit[];

  constructor(private touitsService: TouitsService) { }

  ngOnInit(): void {
    this.wheel = true;
    // this.touitsService.getAllTouits()
    //   .subscribe({
    //     next: response => {
    //       console.log(response)
    //       this.touitsList = response.messages
    //     },
    //     complete: () => this.wheel = false
    //   })
  }
}