import {
  Component,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import {
  EventApi,
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IUser } from 'src/app/models/IUser.model';
import { SharedService } from 'src/app/services/shared.service';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { customEvent } from 'src/app/models/customEvent.model';
import { map } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda.service';
import { UserService } from 'src/app/services/user.service';
// import { INITIAL_EVENTS } from 'src/app/event-utils';
import { INITIAL_EVENTS, createEventId } from 'src/app/event-utils';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css'],
})
export class FullCalendarComponent {
  private previousDate!: Date;
  private previousView!: '';

  private calendar!: Calendar;

  currentDate = new Date();
  @Input() currentUser!: IUser;
  viewType = '';
  userType = 'test';
  appointmentsList: AgendaItem[] = [];
  events: customEvent[] = [];

  currentEvents: EventApi[] = [];
  @Input() pinned: boolean = false;
  @Output() delete: EventEmitter<IUser> = new EventEmitter();
  @Output() pinUser: EventEmitter<IUser> = new EventEmitter();
  calendarEvents: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
  };
  constructor(
    public agendaService: AgendaService,
    private sharedService: SharedService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.agendaService.getPinnedUserDate.subscribe((iUser) => {});
    this.userType = this.currentUser.discipline
      ? this.currentUser.discipline
      : 'client';
    this.getAppointments();
    
    this.sharedService.getViewType.subscribe(async (viewType) => {
      if (this.viewType != viewType) {
        this.viewType = viewType;

        this.calendar.changeView(viewType);
        this.getAppointments();
      }
    });

    this.setCalendar();
  }

  ngAfterViewInit(): void {
    this.setCalendar();

    this.sharedService.getViewType.subscribe(async (viewType) => {
      if (this.viewType != viewType) {
        this.viewType = viewType;

        this.calendar.changeView(viewType);
        this.getAppointments();
      }
    });
  }

  togglePin() {
    this.pinUser.emit(this.currentUser);
    this.userService.isPinned = !this.userService.isPinned;
  }
  getAppointments() {
    this.appointmentsList = [];
    this.viewType = '';
    const userId = this.currentUser.id!;
    const currentDate = new Date(this.currentDate);
    const dateStr = currentDate.toLocaleString();

    if (!isNaN(currentDate.getTime())) {
      const appointmentsFetch =
        this.userType === 'client'
          ? this.agendaService.getMonthAgendaForClientByDate(userId, dateStr)
          : this.agendaService.getMonthAgendaForPractitionerByDate(
              userId,
              dateStr
            );

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

          console.log(
            'appointments: ',
            this.currentUser.displayName,
            appointments

          );
          
          this.events = this.convertAgendaItemToCustomEvent(appointments);
          this.calendar.addEventSource(this.events);
          console.log(
            'events from get : ',
            this.currentUser.displayName,
            this.events
          );
        });
    }
  }

  private setCalendar() {
    this.sharedService.getSelectedDate.subscribe((date) => {
      this.currentDate = date ? date : this.currentDate;
      const newDateAngeda = moment(this.currentDate).format('YYYY-MM-DD');

      var calendarId = 'calendar' + this.currentUser.id;
      this.getAppointments();
      this.sharedService.getViewType.subscribe((viewType) => {
        this.viewType = viewType;
      });
      this.calendar = new Calendar(
        document.getElementById(calendarId) as HTMLElement,
        {
          plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
          headerToolbar: {
            // left: 'prev,next today',
            center: '',
            right: '',
          },

          initialView: this.viewType,
          initialDate: newDateAngeda,
          weekends: false,
          firstDay: 1,
          editable: true,
          selectable: true,
          selectMirror: true,
          allDaySlot: false,
          dayMaxEvents: true,
          locale: 'nl',
          slotMinTime: '06:00:00',
          slotMaxTime: '22:00:00',
          slotDuration: '00:30:00',
          eventColor: 'var(--color-0)',
          events: this.events,
        }
      );
      this.calendar.render();
      // console.log('new calendar initialized in OnInit');
    });
  }
  convertAgendaItemToCustomEvent(appointments: any): any[] {
    const convertedEvents: customEvent[] = [];

    for (const item of appointments) {
      let info: string = '';
      if ((this.userType = 'client')) {
        info =
          item.practitioner.displayName + ', ' + item.practitioner.discipline;
      } else {
        info = item.client.displayName;
      }
      const dateStr = item.date.split('T')[0];

      const convertedEvent: customEvent = {
        title: info,
        start: new Date(dateStr + 'T' + item.startTime),
        end: new Date(dateStr + 'T' + item.endTime),
      };

      convertedEvents.push(convertedEvent);
    }

    return convertedEvents;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        // id: createEventId(),
        // title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
function ViewChild(
  arg0: string
): (target: FullCalendarComponent, propertyKey: 'calendar') => void {
  throw new Error('Function not implemented.');
}
