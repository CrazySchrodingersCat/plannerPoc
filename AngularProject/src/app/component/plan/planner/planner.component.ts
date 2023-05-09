import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { IUser } from 'src/app/models/IUser.model';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { th } from 'date-fns/locale';
import { Client } from 'src/app/models/client.model';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];
  selectedUsers: IUser[] = [
    {
      id: '9D2461E2-5F3C-3D1B-4907-CA52756A26C9',
      displayName: 'Gabriella Washington',
      userType: '0',
      isHidden: false,
    },
    {
      id: 'C3E9184E-6BAF-4F76-3EB1-746811FD2051',
      displayName: 'Gabriel Matthews',
      discipline: 'Fysiotherapeut',
      userType: '5',
      isHidden: false,
    },
  ];
  appointmentsList: AgendaItem[] = [];
  selectedDate: Date = new Date();
  // pinedUser: IUser = {} as IUser;
  pinedUser: IUser[] = [];

  userType: string = '';
  constructor(public agendaService: AgendaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('users in selectedUsers list : ' + this.selectedUsers);
    // console.log('pinnedUser:', this.pinedUser);

    this.agendaService.getPinnedUserDate.subscribe((iUser) => {

    });
  }
  drop(event: CdkDragDrop<IUser[]>) {
    // const dropEvent = event as CdkDragDrop<IUser[]>;
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  deleteFromList(user: IUser) {
    this.selectedUsers = this.selectedUsers.filter((x) => x !== user);
  }
  pinUser(user: IUser) {
    //this.pinedUser = null;
    user.pined = !user.pined;

    if (this.pinedUser.length  === 0) {
      alert('empty user');
      this.pinedUser.push(user);
    } else {
      alert(user.displayName + 'pinned');
      // this.agendaService.setPinnedUserDate.next(null);
      this.pinedUser = [];
    }

    if (user && user.id !== undefined) {
      // this.pinedUser = user;
    }
    // console.log('user pinned: ', this.pinedUser.displayName);
  }
  hideUser(user: IUser) {
    user.isHidden = !user.isHidden;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser !== '') {
        this.selectedUsers.push(newUser);
        console.log(this.selectedUsers);
      }
    });
  }
}
