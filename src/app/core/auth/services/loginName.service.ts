import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginNameService {
  constructor() {}

  private loginData = new BehaviorSubject<string>('');

  triggerEvent(param: any): void {
    this.loginData.next(param);
  }

  getLoginData(): BehaviorSubject<any> {
    return this.loginData;
  }
}
