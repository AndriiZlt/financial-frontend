import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  apiName = 'Auth';
  v = 2;

  register(user: Register): Observable<any> {
    return this.post('register', user);
  }

  login(user: Login): Observable<any> {
    return this.post('login', user);
  }
}
