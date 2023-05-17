import {
  Component,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as moment from 'moment';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  Calendar,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IUser } from 'src/app/models/IUser.model';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SharedService } from 'src/app/services/shared.service';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { map } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda.service';
// import { INITIAL_EVENTS, createEventId } from '../event-utils';

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.css'],
})
export class TestCalendarComponent implements OnChanges {
  private previousDate!: Date;
  private previousView!: '';

  private calendar!: Calendar;

  currentDate = new Date();
  @Input() currentUser!: IUser;
  viewType = 'timeGridDay';
  userType = 'test';
  appointmentsList: AgendaItem[] = [];

  currentEvents: EventApi[] = [];

  constructor(
    public agendaService: AgendaService,
    private sharedService: SharedService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.sharedService.getViewType.subscribe(async (viewType) => {  

      this.viewType = viewType ? viewType : this.viewType;

      console.log(viewType);
      
      this.calendar.changeView(viewType);
    });

    this.sharedService.getSelectedDate.subscribe((date) => {
      this.currentDate = date ? date : this.currentDate;
      const newDateAngeda = moment(this.currentDate).format('YYYY-MM-DD');

      var calendarId = 'calendar' + this.currentUser.id;

      this.calendar = new Calendar(
        document.getElementById(calendarId) as HTMLElement,
        {
          plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
          headerToolbar: {
            // left: 'prev,next today',
            center: '',
            right: '',
          },

          //initialView: 'timeGridDay',
          initialDate: newDateAngeda,

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
          events: this.appointmentsList,
        }
      );

      this.calendar.render();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('test');
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
        // this.findOverlapping(this.appointmentsList);

        //this.appointmentsList.findOverlapping(this.appointmentsList)
        console.log(this.appointmentsList);
      });
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
