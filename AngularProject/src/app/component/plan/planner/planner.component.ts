import { Component } from '@angular/core';
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
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'John' },
    { value: 'pizza-1', viewValue: 'Marie' },
    { value: 'tacos-2', viewValue: 'Thomas' },
  ];
}
