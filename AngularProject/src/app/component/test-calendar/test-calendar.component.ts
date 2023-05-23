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
// import { INITIAL_EVENTS, createEventId } from '../event-utils';

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.css'],
})
export class TestCalendarComponent {
  private previousDate!: Date;
  private previousView!: '';

  private calendar!: Calendar;

  currentDate = new Date();
  @Input() currentUser!: IUser;
  viewType = 'timeGridDay';
  userType = 'test';
  appointmentsList: AgendaItem[] = [];
  events: customEvent[] = [];

  currentEvents: EventApi[] = [];
  @Input() pinned: boolean = false;
  @Output() delete: EventEmitter<IUser> = new EventEmitter();
  @Output() pinUser: EventEmitter<IUser> = new EventEmitter();
  calendarEvents: any[] = [];

  constructor(
    public agendaService: AgendaService,
    private sharedService: SharedService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.agendaService.getPinnedUserDate.subscribe((iUser) => {});
    // this.currentDate = new Date(2023, 4, 3);
    this.userType = this.currentUser.discipline
      ? this.currentUser.discipline
      : 'client';
    this.getAppointments();
    console.log(this.appointmentsList);
  }
  ngAfterViewInit(): void {
    this.sharedService.getSelectedDate.subscribe((date) => {
      this.currentDate = date ? date : this.currentDate;
      const newDateAngeda = moment(this.currentDate).format('YYYY-MM-DD');

      var calendarId = 'calendar' + this.currentUser.id;
      this.getAppointments();

      this.calendar = new Calendar(
        document.getElementById(calendarId) as HTMLElement,
        {
          plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
          headerToolbar: {
            // left: 'prev,next today',
            center: '',
            right: '',
          },

          initialView: 'timeGridDay',
          initialDate: newDateAngeda,
          //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
          weekends: true,
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
          // events: [
          //   {
          //     // this object will be "parsed" into an Event Object
          //     title: 'The Title', // a property!
          //     start: '2023-22-05', // a property!
          //     end: '2023-22-22', // a property! ** see important note below about 'end' **
          //   },
          // ],
        }
      );
      console.log(this.appointmentsList);

      this.calendar.render();
    });
    this.sharedService.getViewType.subscribe(async (viewType) => {
      if (this.viewType != viewType) {
        this.viewType = viewType;
        console.log(viewType);
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
    // const dateStr = new Date(this.currentDate).toLocaleString();
    const currentDate = new Date(this.currentDate);
    const dateStr = currentDate.toLocaleString();
    console.log(this.currentDate);

    console.log(dateStr);

    if (!isNaN(currentDate.getTime())) {
      const appointmentsFetch =
        this.userType === 'client'
          ? this.agendaService.getWeekAgendaForClientByDate(userId, dateStr)
          : this.agendaService.getWeekAgendaForPractitionerByDate(
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
          console.log(appointments);

          this.events = this.convertAgendaItemToCustomEvent(appointments);

          console.log('events: ', this.currentUser.displayName, appointments);
        });
    }
  }
  convertAgendaItemToCustomEvent(appointments: any): any[] {
    const convertedEvents: customEvent[] = [];

    for (const item of appointments) {
      console.log(item);

      const dateStr = item.date.split('T')[0];
      console.log(dateStr);

      const convertedEvent: customEvent = {
        title: item.client.displayName,
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
): (target: TestCalendarComponent, propertyKey: 'calendar') => void {
  throw new Error('Function not implemented.');
}
