import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../Models/Client';

@Component({
  selector: 'app-verifyinfo',
  templateUrl: './verifyinfo.component.html',
  styleUrls: ['./verifyinfo.component.sass'],
})
export class VerifyinfoComponent implements OnInit {
  @Input() clientInfo: Client;

  constructor() {}

  ngOnInit(): void {}
}
