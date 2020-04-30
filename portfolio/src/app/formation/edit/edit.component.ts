import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationService } from '../formation.service';
import { Formation } from '../formation.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FeatureCollection } from 'src/app/FeatureCollection.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditFormationComponent implements OnInit {



  editFormationForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',  Validators.required),
    location: new FormControl(''),
    yearStart: new FormControl('', Validators.required),
    yearEnd: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(500))
  });
  formation: Formation;
  id = -1;
  options = [];

  constructor(
    private formationService: FormationService,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.getById();
  }

  reset(): void {
    this.router.navigate(['formation']);
  }

  submit(): void {
    // UPDATING
    const formation = new Formation();
    formation.id = this.editFormationForm.value.id;
    formation.name = this.editFormationForm.value.name;
    formation.location = this.editFormationForm.value.location;
    formation.yearStart = this.editFormationForm.value.yearStart;
    formation.yearEnd = this.editFormationForm.value.yearEnd;
    formation.description = this.editFormationForm.value.description;

    // SEND THE Experience UPDATED
    this.formationService.edit(formation, formation.id)
    .subscribe( () => {
      const message = `Experience modifiée avec succès ! ✅`;
      this.snackbar.open(message, '', {duration: 3500, panelClass: ['snackbar-success']});
      this.router.navigate(['formation']);
    }, err => {
      const errorMessage = '❌ Erreur lors de la modification de la formation ❌ : ' + err;
      this.snackbar.open(errorMessage, '', {duration: 3500, panelClass: ['snackbar-error']});
    });
  }

  private getById(): void {
    this.formation = this.formationService.stock;
    this.formationService.stock = null;
    this.id = this.formation.id;
    this.editFormationForm.patchValue({
      id: this.formation.id,
      name: this.formation.name,
      startDate: this.formation.yearStart,
      endDate: this.formation.yearEnd,
      description: this.formation.description
    });
  }

  search(): void {
    this.options = [];
    this.authService.getAdresseViaApi(this.editFormationForm.value.location).subscribe( (res: FeatureCollection) =>  {
      if (res != null) {
        res.features.forEach(element => {
          this.options.push(element.properties.label);
        });
      }
    }, err => console.error(err));
  }
}
