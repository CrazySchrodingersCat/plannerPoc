import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  userType = '';
  constructor(agendaService:AgendaService){}

  ngOnInit(): void {
    this.userType =
      this.currentUser.discipline === undefined
        ? 'client'
        : this.currentUser.discipline!;
        console.log(this.currentUser.discipline);
        console.log(this.userType);
  }
  closeMe() {
     console.log('close clicked');
     this.delete.emit(this.currentUser);
  }
}
