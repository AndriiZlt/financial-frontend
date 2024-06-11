import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderView } from '../models/view.model';
import { Layout } from '../models/layout.model';
import { SidenavView } from '../models/sidenav.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private currentLayout: Layout = {
    showHeader: true,
    showSidenav: false,
    headerView: HeaderView.task,
    sidenavView: SidenavView.trading,
  };

  private updatedLayout = new BehaviorSubject<Layout>({
    showHeader: false,
    showSidenav: false,
    headerView: HeaderView.task,
    sidenavView: SidenavView.trading,
  });

  constructor() {}

  triggerLayoutChange(): void {
    let url = localStorage.getItem('lastUrl');
    if (url.includes('auth')) {
      this.updatedLayout.next({
        showHeader: false,
        showSidenav: false,
        headerView: HeaderView.task,
        sidenavView: SidenavView.trading,
      });
    } else if (url.includes('alpaca')) {
      if (url.includes('trading')) {
        this.updatedLayout.next({
          showHeader: true,
          showSidenav: true,
          headerView: HeaderView.alpaca,
          sidenavView: SidenavView.trading,
        });
      } else if (url.includes('assets')) {
        this.updatedLayout.next({
          showHeader: true,
          showSidenav: true,
          headerView: HeaderView.alpaca,
          sidenavView: SidenavView.assets,
        });
      } else if (url.includes('chart')) {
        this.updatedLayout.next({
          showHeader: true,
          showSidenav: true,
          headerView: HeaderView.alpaca,
          sidenavView: SidenavView.chart,
        });
      }
    } else if (url.includes('task')) {
      this.updatedLayout.next({
        showHeader: true,
        showSidenav: false,
        headerView: HeaderView.task,
        sidenavView: SidenavView.trading,
      });
    } else if (url.includes('friends')) {
      if (url.includes('users')) {
        this.updatedLayout.next({
          showHeader: true,
          showSidenav: true,
          headerView: HeaderView.friends,
          sidenavView: SidenavView.users,
        });
      } else {
        this.updatedLayout.next({
          showHeader: true,
          showSidenav: true,
          headerView: HeaderView.friends,
          sidenavView: SidenavView.friends,
        });
      }
    }
  }

  getUpdatedLayout(): BehaviorSubject<Layout> {
    return this.updatedLayout;
  }

  getCurrentLayout(): Layout {
    let lastUrl = localStorage.getItem('lastUrl');
    if (lastUrl) {
      if (lastUrl.includes('auth')) {
        this.currentLayout.showHeader = false;
        this.currentLayout.showSidenav = false;
      } else if (lastUrl.includes('alpaca')) {
        this.currentLayout.showHeader = true;
        this.currentLayout.showSidenav = true;
        this.currentLayout.headerView = HeaderView.alpaca;
        if (lastUrl.includes('trading')) {
          this.currentLayout.sidenavView = SidenavView.trading;
        } else if (lastUrl.includes('assets')) {
          this.currentLayout.sidenavView = SidenavView.assets;
        } else if (lastUrl.includes('chart')) {
          this.currentLayout.sidenavView = SidenavView.chart;
        }
      } else if (lastUrl.includes('task')) {
        this.currentLayout.showHeader = true;
        this.currentLayout.showSidenav = false;
        this.currentLayout.headerView = HeaderView.task;
      } else if (lastUrl.includes('friends')) {
        this.currentLayout.showHeader = true;
        this.currentLayout.showSidenav = true;
        this.currentLayout.headerView = HeaderView.friends;
        if (lastUrl.includes('users')) {
          this.currentLayout.sidenavView = SidenavView.users;
        } else {
          this.currentLayout.sidenavView = SidenavView.friends;
        }
      }
    } else {
      this.currentLayout.showHeader = false;
      this.currentLayout.showSidenav = false;
    }
    return this.currentLayout;
  }
}
