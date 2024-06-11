import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionService {
  connection: signalR.HubConnection;
  message$?: Observable<string>;
  private sinalStatus = new Subject<any>();
  private updateData!: () => void;
  private _apiUrl;

  constructor(private http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  startConnection = async () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this._apiUrl}/signal-hub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    await this.connection
      .start()
      .then(() => {
        console.log('SignalR connection started');
        this.connection.on('status', (res) => {
          this.sendData('connected');
        });
        this.serverListenerOn();
      })
      .catch((err) => console.log('Error while starting connection:', err));
  };

  onDataUpdate(fn: () => void) {
    this.updateData = fn;
  }

  saveId(userId: number) {
    this.connection.invoke('Register', userId).catch((e) => console.log(e));
  }

  serverListenerOn() {
    this.connection.on('recieveMessage', (res) => {
      console.log('Signal message:', res);
      this.message$ = res;
      this.updateData();
    });
  }

  sendMessage(targetUserId: string, taskTitle: string) {
    this.connection
      .invoke('SendMessage', targetUserId, taskTitle)
      .catch((e) => console.log(e));
  }

  // Observable service
  sendData(data: any) {
    this.sinalStatus.next({ text: data });
  }

  getData(): Observable<any> {
    return this.sinalStatus.asObservable();
  }
}
