import { Component, OnInit } from '@angular/core';
import { Skill } from '../skills.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../skills.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateSkillComponent {

  hide = true;
  newSkillForm = new FormGroup({
    name: new FormControl('',  Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateSkillComponent>,
    private skillService: SkillService
  ) { }

  reset(): void {
    this.dialogRef.close();
  }

  submit(): void {

    const newSkill = new Skill();
    newSkill.name = this.newSkillForm.value.name;
    newSkill.countUsedIn = 0;

    this.skillService.add(newSkill)
    .subscribe( () => { }, err => console.error(err));
    this.dialogRef.close('ok');
  }


}
