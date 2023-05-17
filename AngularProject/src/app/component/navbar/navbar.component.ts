import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  url: string = '';
  selectedTimeToggle: number = 1;

  constructor(private router: Router, private sharedService: SharedService) {
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
    this.sharedService.setViewType.next('timeGridDay');      
  }
  weekToggeleClicked(event: any) {
   this.sharedService.setViewType.next('timeGridWeek');      
  }

  monthToggeleClicked(event: any) {
     this.sharedService.setViewType.next('dayGridMonth');
  }
}
