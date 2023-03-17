import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerDetailComponent } from './practitioner-detail.component';

describe('PractitionerDetailComponent', () => {
  let component: PractitionerDetailComponent;
  let fixture: ComponentFixture<PractitionerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
