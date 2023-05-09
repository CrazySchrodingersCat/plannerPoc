import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/models/IUser.model';
import { Client } from 'src/app/models/client.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements AfterViewInit {
  selectedUserType = 'practitioner';
  selectedUserId: any = '';
  selectedUser: any = null;
  isDisabled = true;
  practitionerList!: Practitioner[];
  clientList!: Client[];
  displayedColumns: string[] = ['discipline', 'displayName'];
  dataSource = new MatTableDataSource<IUser>();
  clickedRows = new Set<IUser>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let practitionersFetch = this.userService.getPractitioners();
    practitionersFetch.subscribe((practitioners: any) => {
      this.practitionerList = practitioners;

      this.userService.getUserList.subscribe((userList: any) => {
        const newUsers = practitioners.filter(
          (user: IUser) => !userList.map((u: IUser) => u.id).includes(user.id)
        );
        this.dataSource.data = newUsers;
      });
    });
    this.userService.getAllClients().subscribe((clients: any) => {
      this.clientList = clients;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  userTypeChanged() {
    if (this.selectedUserType === 'client') {
      this.displayedColumns = ['displayName'];
      this.dataSource.data = this.clientList;
    } else {
      this.displayedColumns = ['discipline', 'displayName'];
      this.dataSource.data = this.practitionerList;
    }
  }

  selectUser(user: IUser) {
    this.selectedUser =
      this.selectedUserId === '' || this.selectedUser !== user ? user : null;
    this.selectedUserId =
      this.selectedUserId === '' || this.selectedUserId !== user.id
        ? user.id
        : '';
    this.isDisabled = this.selectedUserId !== '' ? false : true;
  }
}
