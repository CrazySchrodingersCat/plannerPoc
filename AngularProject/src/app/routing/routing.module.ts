import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractitionerOverviewComponent } from '../component/practitioner/practitioner-overview/practitioner-overview.component';
import { PractitionerDetailComponent } from '../component/practitioner/practitioner-detail/practitioner-detail.component';
import { PlannerComponent } from '../component/plan/planner/planner.component';

const routes: Routes = [
  { path: 'practitioners', component: PractitionerOverviewComponent },
  { path: 'practitioners/:id', component: PractitionerDetailComponent },

  { path: 'planner', component: PlannerComponent },

  { path: '', redirectTo: 'planner', pathMatch: 'full' },
  { path: '**', redirectTo: 'planner', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
