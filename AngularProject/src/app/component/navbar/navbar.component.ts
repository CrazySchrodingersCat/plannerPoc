import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  url: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((val: any) => {
      this.url = this.router.url;
    });
  }
  dagToggeleClicked(event: any) {
    event.target.classList.toggle('selectedButton');
  }
  weekToggeleClicked(event: any) {
    event.target.classList.toggle('selectedButton');
  }
  monthToggeleClicked(event: any) {
    event.target.classList.toggle('selectedButton');
  }
}
