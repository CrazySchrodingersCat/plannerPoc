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
import { PlannerComponent } from './component/plan/plannerPage/planner.component';
import { PractitionerDetailComponent } from './component/practitioner/practitioner-detail/practitioner-detail.component';
import { PractitionerOverviewComponent } from './component/practitioner/practitioner-overview/practitioner-overview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnComponent } from './component/plan/column/column.component';
import { AddUserComponent } from './component/plan/add-user/add-user.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatFormFieldModule } from '@angular/material/form-field';

import { UserPipe } from './userpipe';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TestCalendarComponent } from './component/test-calendar/test-calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlannerComponent,
    PractitionerDetailComponent,
    PractitionerOverviewComponent,
    ColumnComponent,
    AddUserComponent,
    UserPipe,
    TestCalendarComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-Nl' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FullCalendarModule,
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
    DragDropModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class AppModule {}
