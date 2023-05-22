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
  selectedTimeToggle: boolean = false;

  constructor(private router: Router, private sharedService: SharedService) {
    this.router.events.subscribe((val: any) => {
      this.url = this.router.url;
    });
  }


  dagToggeleClicked(event: any) {
     const buttonElement = event.target as HTMLButtonElement;
     buttonElement.classList.toggle('selectedButton');
    this.sharedService.setViewType.next('timeGridDay');      
  }
  weekToggeleClicked(event: any) {
     const buttonElement = event.target as HTMLButtonElement;
     buttonElement.classList.toggle('selectedButton');
   this.sharedService.setViewType.next('timeGridWeek');      
  }

  monthToggeleClicked(event: any) {
     const buttonElement = event.target as HTMLButtonElement;
     buttonElement.classList.toggle('selectedButton');
     this.sharedService.setViewType.next('dayGridMonth');
  }
}
