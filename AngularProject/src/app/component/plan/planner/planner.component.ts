import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { IUser } from 'src/app/models/IUser.model';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent {
  selectedUsers: IUser[] = [];
  selectedUser: IUser = {
    displayName: 'John Doe',
    discipline:'fisio'
  };
  selectedDate: Date = new Date();
  constructor(public dialog: MatDialog) {}

  //  ngOnInit(): void {
  //   console.log(this.selectedUsers);
  //  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((newUser) => {
      this.selectedUsers.push(newUser);
    });
  }
}