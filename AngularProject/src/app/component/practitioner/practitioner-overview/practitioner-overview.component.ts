import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Practitioner } from 'src/app/models/practitioner.model';

import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-practitioner-overview',
  templateUrl:'./practitioner-overview.component.html',
  styleUrls: ['./practitioner-overview.component.css']
})
export class PractitionerOverviewComponent implements AfterViewInit, OnInit {
    list!: Practitioner[] ;
    displayedColumns: string[] = ['displayName', 'discipline'];
    dataSource = new MatTableDataSource<Practitioner>(); 

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }  
  
    constructor(private practitionerService: PractitionerService){}

    ngOnInit():void{
      let practitionersyFetch = this.practitionerService.getPractitioners();
      practitionersyFetch.subscribe((practitioners:any)=>{
        this.list = practitioners;
        this.dataSource.data = practitioners
        console.log(this.list)
      })
    }
}

