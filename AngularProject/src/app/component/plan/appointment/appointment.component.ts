import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  // @Input() duration: number = 1;
  @Input() start: Date = new Date();
  @Input() end: Date = new Date();
  @Input() typeOfApp: string = 'Intake gesprek ';
  @Input() nameParticipant: string = 'John Snow';
  @Input() color: string = '#009f1a';
  duration = (this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60);

  //css parameters for ngStyle
  time = 2;
  height = `58.58px`;
  // height = `${this.duration * 58.58}px`;
  top = `300px`;
  startTime = 10;
  // top = `${(this.startTime - 7) * 58.58 + 151}px`;
}
