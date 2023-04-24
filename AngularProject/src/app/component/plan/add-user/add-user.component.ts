import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { ClientService } from 'src/app/services/client.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements AfterViewInit {
  selectedUserType = 'practitioner';
  practitionerslist!: Practitioner[];
  clientList!: Client[];
  displayedColumns: string[] = ['discipline', 'displayName'];
  dataSource = new MatTableDataSource<Practitioner>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private practitionerService: PractitionerService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let practitionersFetch = this.practitionerService.getPractitioners();
    practitionersFetch.subscribe((practitioners: any) => {
      this.practitionerslist = practitioners;
      this.dataSource.data = practitioners;
      console.log(this.practitionerslist);
    });
    console.log(this.selectedUserType);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  userTypeChanged() {
    if (this.selectedUserType === 'client') {
      console.log(this.selectedUserType);
      this.displayedColumns = ['displayName'];
      this.clientService.getAllClients().subscribe((clients: any) => {
        this.practitionerslist = clients;
        this.dataSource.data= clients;
        console.log(this.practitionerslist);
      });
    }else{
      let practitionersFetch = this.practitionerService.getPractitioners();
      practitionersFetch.subscribe((practitioners: any) => {
        this.practitionerslist = practitioners;
        this.dataSource.data = practitioners;
        console.log(this.practitionerslist);
      });
      console.log(this.selectedUserType);
    }
  }
}
