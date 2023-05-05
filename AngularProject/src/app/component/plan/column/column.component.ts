import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { map } from 'rxjs';
import { IUser } from 'src/app/models/IUser.model';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { AgendaService } from 'src/app/services/agenda.service';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnChanges {
  private previousDate!: Date;
  @Input() currentDate = new Date();
  @Input() currentUser!: IUser;
  @Output() delete: EventEmitter<IUser> = new EventEmitter();
  appointmentsList: AgendaItem[] = [];
  id: string = '';

  //css parameters for ngStyle
  time = 2;
  height = `${this.time * 58.58}px`;
  startTime = 10;
  top = `${(this.startTime - 7)*58.58 + 151}px`;
  

  userType = '';
  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    this.userType = this.currentUser.discipline
      ? this.currentUser.discipline
      : 'client';
    console.log(this.userType);
    this.getAppointments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentDate'] && !changes['currentDate'].firstChange) {
      if (
        new Date(this.currentDate).getTime() !==
        new Date(this.previousDate).getTime()
      ) {
        console.log('Current date has changed');
        this.getAppointments();
    
      }
    }
    this.previousDate = this.currentDate;
  }
  closeMe() {
    console.log('close clicked');
    this.delete.emit(this.currentUser);
  }
  getAppointments() {
    this.appointmentsList = [];
    const userId = this.currentUser.id!;
    const dateStr = new Date(this.currentDate).toLocaleDateString();

    const appointmentsFetch =
      this.userType === 'client'
        ? this.agendaService.getAgendaForClientByDate(userId, dateStr)
        : this.agendaService.getAgendaForPractitionerByDate(userId, dateStr);

    appointmentsFetch
      .pipe(
        map((response: any) => {
          if (response.status === 404) {
            throw new Error('Not found');
          }
          return response;
        })
      )
      .subscribe((appointments: any) => {
        this.appointmentsList = appointments;
        console.log(this.appointmentsList);
      });
          
  }
}
