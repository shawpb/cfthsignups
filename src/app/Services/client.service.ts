import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Globals } from '../globals';
import { Client } from '../Models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(public http: HttpClient, public globals: Globals) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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
    let addClientResponse: any;
    this.http
      .put<Client>(this.globals.apiBaseUrl, newClient, this.httpOptions)
      .subscribe((x) => (addClientResponse = x));
    console.log(addClientResponse);
  }
}
