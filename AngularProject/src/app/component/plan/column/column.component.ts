import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/IUser.model';

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
  @Input() userType = '';
}
