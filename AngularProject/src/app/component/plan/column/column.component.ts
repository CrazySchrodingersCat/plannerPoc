import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/models/IUser.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  @Input() currentDate = new Date();
  @Input() currentUser!: IUser;
  @Output() delete: EventEmitter<IUser> = new EventEmitter();

  userType = '';

  ngOnInit(): void {
    this.userType =
      this.currentUser.discipline === ''
        ? 'client'
        : this.currentUser.discipline!;
  }
  closeMe() {
     console.log('close clicked');
     this.delete.emit(this.currentUser);
  }
}
