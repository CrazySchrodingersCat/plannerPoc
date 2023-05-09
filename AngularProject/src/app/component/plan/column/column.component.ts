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
import { UserService } from 'src/app/services/user.service';
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
  pinnedEmpty: boolean = true;
  @Output() pinUser: EventEmitter<IUser> = new EventEmitter();

  //css parameters for ngStyle
  time = 2;
  height = `${this.time * 58.58}px`;
  startTime = 10;
  top = `${(this.startTime - 7) * 58.58 + 151}px`;

  userType = '';
  // pinnedEmpty: boolean = true;
  constructor(
    private agendaService: AgendaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.agendaService.getPinnedUserDate.subscribe((iUser) => {});
    this.userType = this.currentUser.discipline
      ? this.currentUser.discipline
      : 'client';

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
    if (this.userService.isPinned) {
      console.log('PINNED! ', this.userService.isPinned);

      this.pinnedEmpty = false;
      console.log('EMPTY? ', this.pinnedEmpty);
    } else {
      this.pinnedEmpty = true;
      console.log('UNPINNED! ', this.userService.isPinned);
    }
  }
  closeMe() {
    console.log('close clicked');
    this.delete.emit(this.currentUser);
  }
  togglePin() {
    this.pinUser.emit(this.currentUser);
    this.userService.isPinned = !this.userService.isPinned;
    console.log(
      'pin clicked in component for user ' + this.currentUser.displayName
    );
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
