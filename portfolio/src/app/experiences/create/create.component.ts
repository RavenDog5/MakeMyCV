import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Skill } from 'src/app/skills/skills.model';
import { SkillService } from 'src/app/skills/skills.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers : [
    { provide: MAT_DATE_LOCALE, useValue: 'fr'},
  ]
})
export class CreateExperienceComponent implements OnInit{


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = [ 'Lemon', 'Orange', 'Apple', 'PineApple'];
  allSkills: Skill[];


  minDate = new Date(1960, 1, 1);
  maxDate = new Date(2050, 1, 1);
  hide = true;
  newExperienceForm = new FormGroup({
    name: new FormControl('',  Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(500)),
    competences: new FormControl(''),
  });

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private xpService: ExperienceService,
    private skillService: SkillService,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe( startWith (null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    this.getAllSkills();
  }

  reset(): void {
    this.router.navigate(['experiences']);
  }

  submit(): void {

    const mail = this.authService.userConnected.email;
    const newSkill = new Experience();
    newSkill.name = this.newExperienceForm.value.name;
    newSkill.startDate = this.newExperienceForm.value.startDate;
    newSkill.endDate = this.newExperienceForm.value.endDate;
    newSkill.description = this.newExperienceForm.value.description;

    this.authService.getByEmail(mail).subscribe( (res) => {
      this.xpService.add(newSkill, res.id)
      .subscribe( (result) => {
        const message = `Experience ajoutée avec succès ! ✅`;
        this.snackbar.open(message, '', {duration: 3500, panelClass: ['snackbar-success']});
        this.router.navigate(['experiences']);
      }, err => console.error(err));
    });
  }

  private getAllSkills() {
    this.skillService.getAll().subscribe( (res: any) => {
      this.allSkills = res.skills;
    }, err => console.error(err));
  }
  // CHIPS
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


}
