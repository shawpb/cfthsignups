import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Globals } from '../globals';
import { Client } from '../Models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(public http: HttpClient, public globals: Globals) {}

  getClients(): Client[] {
    let clients: Client[];
    this.http
      .get<Client[]>(this.globals.apiBaseUrl)
      .subscribe((data: Client[]) => {
        clients = data;
      });
    return clients;
  }

  getClient(cId: string): Client {
    let client: Client;
    this.http
      .get<Client>(this.globals.apiBaseUrl.concat(cId))
      .subscribe((data: Client) => {
        client = data;
      });
    return client;
  }

  AddClient(newClient: Client): void {
    this.http.put(this.globals.apiBaseUrl, newClient);
  }
}
