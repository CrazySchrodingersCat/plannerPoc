import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { IUser } from 'src/app/models/IUser.model';
import { AgendaItem } from 'src/app/models/agentaItem.model';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent {
  selectedUsers: IUser[] = [];
  appointmentsList: AgendaItem[] = [];
  testUser: IUser = {
    displayName: 'Gabriel Matthews',
    discipline: 'Fysiotherapeut',
    id: 'C3E9184E-6BAF-4F76-3EB1-746811FD2051',
  };
  selectedDate: Date = new Date();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedUsers.push(this.testUser);
    this.selectedUsers.push({
      displayName: 'Gabriella Washington',
      id: '9D2461E2-5F3C-3D1B-4907-CA52756A26C9',
    });
  }

  deleteFromList(user: IUser) {
    this.selectedUsers = this.selectedUsers.filter((x) => x !== user);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((newUser) => {
      this.selectedUsers.push(newUser);
      console.log(this.selectedUsers);
    });
  }
}