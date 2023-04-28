import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from 'src/app/models/IUser.model';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { AgendaService } from 'src/app/services/agenda.service';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  @Input() currentDate = new Date();
  @Input() currentUser!: IUser;
  @Output() delete: EventEmitter<IUser> = new EventEmitter();
  appointmentsList: AgendaItem[] = [];
  id: string = '';
  // date = this.currentDate.toLocaleDateString();

  userType = '';
  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    this.userType = this.currentUser.discipline
      ? this.currentUser.discipline
      : 'client';
    console.log(this.userType);

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
        this.appointmentsList.push(appointments);
        console.log(this.appointmentsList);
      });
  }
  closeMe() {
    console.log('close clicked');
    this.delete.emit(this.currentUser);
  }
}
