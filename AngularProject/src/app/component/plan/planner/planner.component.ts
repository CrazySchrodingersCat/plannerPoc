import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PlannerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'John' },
    { value: 'pizza-1', viewValue: 'Marie' },
    { value: 'tacos-2', viewValue: 'Thomas' },
  ];
}
