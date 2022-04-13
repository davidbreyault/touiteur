import { Component, Input, OnInit } from '@angular/core';
import { Touit } from '../models/Touit.model';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent implements OnInit {

  @Input() touit!: Touit;

  constructor() { }

  ngOnInit(): void {
  }

}
