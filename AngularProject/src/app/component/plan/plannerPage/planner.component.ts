import { Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { IUser } from 'src/app/models/IUser.model';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AgendaService } from 'src/app/services/agenda.service';
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent {
  selectedUsers: IUser[] = [
    {
      id: '9D2461E2-5F3C-3D1B-4907-CA52756A26C9',
      displayName: 'Gabriella Washington',
      userType: '0',
      isHidden: false,
      isPinned: false,
    },
    {
      id: 'C3E9184E-6BAF-4F76-3EB1-746811FD2051',
      displayName: 'Gabriel Matthews',
      discipline: 'Fysiotherapeut',
      userType: '5',
      isHidden: false,
      isPinned: false,
    },
  ];
  appointmentsList: AgendaItem[] = [];
  selectedDate: Date = new Date();
  pinnedUser: IUser[] = [];
  checked: boolean = false;
  color: ThemePalette = 'accent';

  userType: string = '';
  constructor(
    public agendaService: AgendaService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('nl');
  }

  ngOnInit(): void {
    // this.agendaService.getPinnedUserDate.subscribe((iUser) => {});
  }
  getDateSelected(e: any) {
    const newDate = moment(e).format('YYYY-MM-DD');
    this.sharedService.setSelectedDate.next(newDate);
    // console.log(newDate);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.selectedUsers,
      event.previousIndex,
      event.currentIndex
    );
  }
  deleteFromList(user: IUser) {
    this.selectedUsers = this.selectedUsers.filter((x) => x !== user);
  }
  pinUser(user: IUser) {
    user.isPinned = !user.isPinned;
    user.isHidden = !user.isHidden;
    if (this.pinnedUser.length === 0) {
      this.pinnedUser.push(user);
      this.agendaService.setPinnedUserDate.next(user);
      console.log('pinned user', this.pinnedUser);
    } else {
      this.agendaService.setPinnedUserDate.next(null);
      this.pinnedUser = [];
    }
    this.setUserFirstInList(user);
  }
  hideUser(user: IUser) {
    user.isHidden = !user.isHidden;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser !== '' && newUser !== undefined) {
        this.selectedUsers.push(newUser);
        console.log(this.selectedUsers);
      }
    });
  }
  setUserFirstInList(user: IUser) {
    // Zoek de index van de gebruiker in de lijst
    const userIndex = this.selectedUsers.findIndex((u) => u.id === user.id);

    if (userIndex !== -1) {
      // Verwijder de gebruiker uit de lijst
      const selectedUser = this.selectedUsers.splice(userIndex, 1)[0];
      // Voeg de gebruiker weer toe aan de eerste positie
      this.selectedUsers.unshift(selectedUser);
    }
  }
  filterWeekends = (date: Date): boolean => {
    const day = date.getDay();
    // Return true to enable the date if it's not a weekend (Saturday = 6, Sunday = 0)
    return day !== 6 && day !== 0;
  };
  calendarOn() {
    this.checked = !this.checked;
  }
}
