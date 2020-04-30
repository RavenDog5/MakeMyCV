import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationService } from '../formation.service';
import { Formation } from '../formation.model';
import { Router } from '@angular/router';
import { FeatureCollection } from 'src/app/FeatureCollection.interface';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateFormationComponent implements OnInit {

  newFormationForm = new FormGroup({
    name: new FormControl('',  Validators.required),
    location: new FormControl(''),
    yearStart: new FormControl('', Validators.required),
    yearEnd: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(500)),
    competences: new FormControl(''),
  });
  options = [];

  constructor(
    private formationService: FormationService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {  }

  ngOnInit(): void {  }

  reset(): void {
    this.newFormationForm.clearValidators();
    this.newFormationForm.reset();
  }

  submit(): void {

    const newFormation = new Formation();
    newFormation.name = this.newFormationForm.value.name;
    newFormation.location = this.newFormationForm.value.location;
    newFormation.yearStart = this.newFormationForm.value.yearStart;
    newFormation.yearEnd = this.newFormationForm.value.yearEnd;
    newFormation.description = this.newFormationForm.value.description;

    this.formationService.addDependant(newFormation, this.authService.userConnected.id).subscribe( () => {
      const message = 'Formation ajoutée avec succès ! ✅';
      this.snackbar.open(message, '', {duration: 3500, panelClass: ['snackbar-success']});
      this.router.navigate(['formation']);
    }, err => {
      const errorMessage = '❌ Il y a un probleme lors de la création de la formation ❌';
      this.snackbar.open(errorMessage, '', {duration: 3500, panelClass: ['snackbar-error']});
    });
  }

  search(): void {
    this.options = [];
    this.authService.getAdresseViaApi(this.newFormationForm.value.location).subscribe( (res: FeatureCollection) =>  {
      if (res != null) {
        res.features.forEach(element => {
          this.options.push(element.properties.label);
        });
      }
    }, err => console.error(err));
  }

}
