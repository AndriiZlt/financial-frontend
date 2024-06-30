import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UrlService {
  constructor(private router: Router,) {}

  navigateToLast(): void {
    let lastUrl = localStorage.getItem('lastUrl');

    if (lastUrl) {
      this.router.navigate([lastUrl]);
    } else {
      this.router.navigate(['task']);
    }
  }

  setToLocalStorage():void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        localStorage.setItem('lastUrl', val.url);
      }
    });
  }

  getLastUrl():string {
    return localStorage.getItem('lastUrl');
  }
}
