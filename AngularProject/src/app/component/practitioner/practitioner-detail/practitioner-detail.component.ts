import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Practitioner } from 'src/app/models/practitioner.model';
import { UserService } from 'src/app/services/user.service';

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
  name!: string;
  disciplines: string[] = [
    'Fysiotherapeut',
    'Regiebehandelaar',
    'Psycholoog(LV)',
    'Psycholoog (CGT)',
    'Psycholoog (PS)',
  ];

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == '') {
      this.isNew = true;
      this.practitioner = new Practitioner('', '');
    } else {
      this.service
        .getPractitionerById(this.id)
        .subscribe((data: Practitioner) => {
          this.practitioner = data;
          this.selectedDiscipline = data.discipline;
          this.name = data.displayName;
        });
    }

    this.practitionerForm = new FormGroup({
      displayName: new FormControl<String>('', [Validators.required]),
      discipline: new FormControl<String>(''),
    });
  }

  get formControls() {
    return this.practitionerForm.controls;
  }

  onSubmit() {
    if (this.practitionerForm.valid) {
      let newPractitioner: Practitioner = new Practitioner(
        this.practitionerForm.value['displayName'],
        this.practitionerForm.value['discipline']
      );

      if (this.id == '') {
        this.service.addPractitioner(newPractitioner).subscribe(() => {
          alert('Practitioner added successfully');
          this.router.navigate(['/Practitioners']);
        });
      } else {
        this.service
          .editPractitioner(this.id, newPractitioner)
          .subscribe(() => {
            alert('Practitioner changed successfully');
            this.router.navigate(['/Practitioners']);
          });
      }
    } else {
      // alert("form validation error.");
      return;
    }
  }

  delete() {
    this.service.deleteById(this.id).subscribe((data) => {
      this.router.navigate(['/Practitioners']);
    });
  }
}
