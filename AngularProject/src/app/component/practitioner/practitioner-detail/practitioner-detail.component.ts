import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Practitioner } from 'src/app/models/practitioner.model';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-practitioner-detail',
  templateUrl: './practitioner-detail.component.html',
  styleUrls: ['./practitioner-detail.component.css'],
})
export class PractitionerDetailComponent {
  practitionerForm!: FormGroup;
  practitioner!: Practitioner;
  isNew: boolean = false;
  id!: any;
  selectedDiscipline!: string;
  disciplines: string[] = [
    'Fysiotherapeut',
    'Regiebehandelaar',
    'Psycholoog(LV)',
    'Psycholoog (CGT)',
    'Psycholoog (PS)',
  ];

  constructor(
    private service: PractitionerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == 0) {
      
      this.isNew = true;
      this.practitioner = new Practitioner('', '');
      console.log(this.practitioner);
    } else {
      this.service
        .getPractitionerById(this.id)
        .subscribe((data: Practitioner) => {
          this.practitioner = data;
          this.selectedDiscipline = data.discipline;
        });
    }

    this.practitionerForm = new FormGroup({
      displayName : new FormControl<String>('', [Validators.required]),
      discipline: new FormControl<String>('')})

      
  }

  get formControls() {
    return this.practitionerForm.controls;
  }

  onSubmit() {
    if(this.practitionerForm.valid) {
      
    }
  }
}
