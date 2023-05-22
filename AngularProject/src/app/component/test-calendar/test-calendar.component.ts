import {
  Component,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import {
  DateSelectArg,
  EventClickArg,
  EventApi,
  Calendar,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IUser } from 'src/app/models/IUser.model';
import { SharedService } from 'src/app/services/shared.service';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { map } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda.service';
import { UserService } from 'src/app/services/user.service';
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
  events = [];

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
    this.userType = this.currentUser.discipline
      ? this.currentUser.discipline
      : 'client';
    this.getAppointments();
    console.log(this.appointmentsList);
    
  }
  ngAfterViewInit(): void {
    this.sharedService.getViewType.subscribe(async (viewType) => {
      if (this.viewType != viewType) {
        this.viewType = viewType;
        console.log(viewType);
        this.calendar.changeView(viewType);

      }

         
        //this.viewType = viewType ? viewType : this.viewType;

      
      
    });

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
          events: this.events,
        }
        
        
      );
      console.log(this.appointmentsList);

      this.calendar.render();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('test');
  }
  togglePin() {
    this.pinUser.emit(this.currentUser);
    this.userService.isPinned = !this.userService.isPinned;
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
        }),
        map((appointments: any[]) => {
          
          return appointments.map((appointment) => ({
            title: appointment.client.displayName,
            start: new Date(
              appointment.date.substring(0, 10) + 'T' + appointment.startTime
            ),
            end: new Date(
              appointment.date.substring(0, 10) + 'T' + appointment.endTime
            ), // Adjust as needed based on your event data
            // Add more properties as needed
          }));
        })
      )
      .subscribe((appointments: any) => {
        this.events = appointments;
        // this.calendarEvents = appointments;

        console.log(this.events);
      });
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
