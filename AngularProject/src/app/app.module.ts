import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { RoutingModule } from './routing/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PlannerComponent } from './component/plan/planner/planner.component';
import { PractitionerDetailComponent } from './component/practitioner/practitioner-detail/practitioner-detail.component';
import { PractitionerOverviewComponent } from './component/practitioner/practitioner-overview/practitioner-overview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlannerComponent,
    PractitionerDetailComponent,
    PractitionerOverviewComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    RoutingModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}