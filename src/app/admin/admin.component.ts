import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Client } from '../Models/Client';
import { ClientService } from '../Services/client.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  constructor(public clientService: ClientService) {}
  public clients: Client[];

  ngOnInit(): void {
    this.clients = this.getClients();
  }

  getClients(): Client[] {
    return this.clientService.getClients();
  }
}
