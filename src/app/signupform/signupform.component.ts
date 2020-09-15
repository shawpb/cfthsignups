import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.sass'],
})
export class SignupformComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor() {}

  ngOnInit(): void {}
}
