import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Practitioner } from 'src/app/models/practitioner.model';
import { PractitionerService } from 'src/app/services/practitioner.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements AfterViewInit {
  selectedUserType = 'Practitioner';
  list!: Practitioner[];
  displayedColumns: string[] = ['discipline', 'displayName'];
  dataSource = new MatTableDataSource<Practitioner>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private practitionerService: PractitionerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let practitionersFetch = this.practitionerService.getPractitioners();
    practitionersFetch.subscribe((practitioners: any) => {
      this.list = practitioners;
      this.dataSource.data = practitioners;
      console.log(this.list);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
