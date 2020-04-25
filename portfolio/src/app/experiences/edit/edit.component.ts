import { Component, OnInit } from '@angular/core';
import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'}
  ]
})
export class EditExperienceComponent implements OnInit {

  hide = true;

  editExperienceForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',  Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(500))
  });

  constructor(
    private experienceService: ExperienceService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }


  minDate = new Date(1960, 1, 1);
  maxDate = new Date(2050, 1, 1);
  id = -1;
  experience: Experience;
  ngOnInit(): void {
    this.getById();
  }

  reset(): void {
    this.router.navigate(['experiences']);
  }

  submit(): void {
    // UPDATING
    const experience = new Experience();
    experience.id = this.editExperienceForm.value.id;
    experience.name = this.editExperienceForm.value.name;
    experience.startDate = this.editExperienceForm.value.startDate;
    experience.endDate = this.editExperienceForm.value.endDate;
    experience.description = this.editExperienceForm.value.description;

    // SEND THE Experience UPDATED
    this.experienceService.edit(experience, experience.id)
    .subscribe( () => {
      const message = `Experience modifiée avec succès ! ✅`;
      this.snackbar.open(message, '', {duration: 3500, panelClass: 'snackbar-success'});
    }, err => console.error(err));
    this.router.navigate(['experiences']);
  }

  private getById(): void {
    this.experience = this.experienceService.stockData;
    this.experienceService.stockData = null;
    this.id = this.experience.id;
    this.editExperienceForm.patchValue({
      id: this.experience.id,
      name: this.experience.name,
      startDate: this.experience.startDate,
      endDate: this.experience.endDate,
      description: this.experience.description
    });
  }
}
