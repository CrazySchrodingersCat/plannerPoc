import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { IUser } from 'src/app/models/IUser.model';
import { AgendaItem } from 'src/app/models/agentaItem.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { th } from 'date-fns/locale';
import { Client } from 'src/app/models/client.model';
import { AgendaService } from 'src/app/services/agenda.service';
import { ClientService } from 'src/app/services/client.service';

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
  constructor(public agendaService: AgendaService, public clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.clientService.setUserList.next(this.selectedUsers)
  
    
    // console.log('pinnedUser:', this.pinedUser);

    this.agendaService.getPinnedUserDate.subscribe((iUser) => {});
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
    // const dropEvent = event as CdkDragDrop<IUser[]>;
    moveItemInArray(this.selectedUsers, event.previousIndex, event.currentIndex);
  }
  deleteFromList(user: IUser) {
    this.selectedUsers = this.selectedUsers.filter((x) => x !== user);
  }
  pinUser(user: IUser) {
    user.pined = !user.pined;
    this.hideUser(user);
    if (this.pinedUser.length === 0) {
      this.pinedUser.push(user);
      this.agendaService.setPinnedUserDate.next(user);
      alert(user.displayName + ' pinned');
    } else {
      alert(user.displayName + ' unpined');
      this.agendaService.setPinnedUserDate.next(null);
      this.pinedUser = [];
    }
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
