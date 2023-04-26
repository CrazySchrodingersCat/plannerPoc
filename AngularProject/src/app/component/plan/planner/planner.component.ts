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
  testUser: IUser = {
    displayName: 'John Doe',
    discipline: 'Fysiotherapeut',
    id:'1111'
  };
  selectedDate: Date = new Date();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedUsers.push(this.testUser);
    this.selectedUsers.push( {
    displayName: 'Anna Smith',
    id:'2222'});
  };
  

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