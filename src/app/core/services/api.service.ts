// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiName: string;
  v: number;
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.get<T>(
      `${environment.apiUrl}/api/v${this.v}/${this.apiName}/${url}`,
      options
    );
  }

  post<T>(
    url: string,
    body: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.post<T>(
      `${environment.apiUrl}/api/v${this.v}/${this.apiName}/${url}`,
      body,
      options
    );
  }

  delete<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.delete<T>(
      `${environment.apiUrl}/api/v${this.v}/${this.apiName}/${url}`,
      options
    );
  }

  put<T>(
    url: string,
    body: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.put<T>(
      `${environment.apiUrl}/api/v${this.v}/${this.apiName}/${url}`,
      body,
      options
    );
  }

  handleError() {}
}
