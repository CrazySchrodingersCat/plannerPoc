import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerOverviewComponent } from './practitioner-overview.component';

describe('PractitionerOverviewComponent', () => {
  let component: PractitionerOverviewComponent;
  let fixture: ComponentFixture<PractitionerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionerOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
