import { Component, EventEmitter, Input, Output } from '@angular/core';
import { th } from 'date-fns/locale';
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
    this.userType =
      this.currentUser.discipline === undefined
        ? 'client'
        : this.currentUser.discipline!;
    console.log(this.userType);
    this.id = this.currentUser.id!;
    let appointmentsFetch = this.agendaService.getAgendaForPractitionerByDate(
      this.id,
      new Date(this.currentDate).toLocaleDateString()
    );
    appointmentsFetch.subscribe((appointments: any) => {
      this.appointmentsList.push(appointments);
      console.log(this.appointmentsList);
    });
  }
  closeMe() {
    console.log('close clicked');
    this.delete.emit(this.currentUser);
  }
}
