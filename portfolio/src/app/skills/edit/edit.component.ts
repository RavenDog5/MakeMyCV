import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../skills.model';
import { SkillService } from '../skills.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditSkillComponent {

  hide = true;
  editSkillForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',  Validators.required),
    level: new FormControl('', [Validators.max(10), Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillService: SkillService
  ) {
    this.editSkillForm.patchValue({
      id: data.id,
      name: data.name,
      level: data.level,
      countUsedIn: data.countUsedIn
    });
  }

  reset(): void {
    this.dialogRef.close();
  }

  submit(): void {

    const skill = new Skill();
    skill.countUsedIn = this.editSkillForm.value.countUsedIn;
    skill.id = this.editSkillForm.value.id;
    skill.name = this.editSkillForm.value.name;
    skill.level = this.editSkillForm.value.level;
    this.skillService.edit(skill, skill.id)
    .subscribe( data => { }, err => console.error(err));
    this.dialogRef.close('ok');
  }
}
