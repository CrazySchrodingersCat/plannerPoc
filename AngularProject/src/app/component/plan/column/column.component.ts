import { ThisReceiver } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/IUser.model';
import { Client } from 'src/app/models/client.model';
import { Practitioner } from 'src/app/models/practitioner.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  @Input() currentDate = new Date();
  @Input() currentUser!: IUser;
  name = 'test user';
  // const week = this.datepipe.transform(this.currentDate, 'w');
  userType = '';

  ngOnInit(): void {
    this.userType =
      this.currentUser.discipline === ''
        ? 'client'
        : this.currentUser.discipline!;
  }
}
