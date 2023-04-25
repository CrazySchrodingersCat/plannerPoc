import { Component } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isPlanning = false;
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe((val: any) => {
      this.activateDiv(this.router.url);
    });
  }

  activateDiv(url: string) {
    // console.log(url == '/planner');
    if (url == '/planner') {
      this.isPlanning = true;
    }
  }
}
