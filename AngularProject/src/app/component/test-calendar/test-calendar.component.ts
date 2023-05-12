import {
  Component,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IUser } from 'src/app/models/IUser.model';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SharedService } from 'src/app/services/shared.service';
// import { INITIAL_EVENTS, createEventId } from '../event-utils';

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.css'],
})
export class TestCalendarComponent {
  private previousDate!: Date;
  private previousView!: '';
  @Input() currentDate = new Date();
  @Input() viewType = 'timeGridDay';
  userType = 'test';
  currentUser: IUser = {
    id: '9D2461E2-5F3C-3D1B-4907-CA52756A26C9',
    displayName: 'TEST Gabriella Washington',
    userType: '0',
    isHidden: false,
    isPinned: false,
  };

  // calendar

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      // left: 'prev,next today',
      center: '',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: '',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    allDaySlot: false,
    dayMaxEvents: true,

    locale: 'nl',
    slotMinTime: '06:00:00',
    slotMaxTime: '22:00:00',

    slotDuration: '00:30:00',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  // ngAfterViewInit() {
  //   this.calendar.gotoDate(this.selectedDate);
  // }
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    //data changes
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

    //view changes
    if (changes['viewType'] && !changes['viewType'].firstChange) {
      if (this.viewType !== this.previousView) {
        console.log('View has changed');
      }
    }
  }
  getAppointments() {
    throw new Error('Method not implemented.');
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  // handleWeekendsToggle() {
  //   const { calendarOptions } = this;
  //   calendarOptions.weekends = !calendarOptions.weekends;
  // }

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
