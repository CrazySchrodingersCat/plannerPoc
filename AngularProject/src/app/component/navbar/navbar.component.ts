import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  url: string = '';
  selectedTimeToggle:number = 1;

  constructor(private router: Router) {
    this.router.events.subscribe((val: any) => {
      this.url = this.router.url;
    });
  }

  // onInit(): void {
  //   if (this.selectedTimeToggle == 1) {
  //     const button = document.querySelector('.dayToggle');
  //      if (button instanceof HTMLElement) {
  //        button.classList.toggle('selectedButton');
  //      }
  //   }

  // }
  dagToggeleClicked(event: any) {
    this.selectedTimeToggle = 1;
     event.target.classList.toggle('selectedButton');
    
  }
  weekToggeleClicked(event: any) {
    this.selectedTimeToggle = 2;
    
    event.target.classList.toggle('selectedButton');
  }
  monthToggeleClicked(event: any) {
    this.selectedTimeToggle = 3;
    event.target.classList.toggle('selectedButton');
  }
}
