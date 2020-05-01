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

  editSkillForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',  Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillService: SkillService
  ) {
    this.editSkillForm.patchValue({
      id: data.id,
      name: data.name
    });
  }

  reset(): void {
    this.dialogRef.close();
  }

  submit(): void {

    const skill = new Skill();
    skill.id = this.editSkillForm.value.id;
    skill.name = this.editSkillForm.value.name;
    skill.countUsedIn = this.editSkillForm.value.countUsedIn;
    this.skillService.edit(skill, skill.id)
    .subscribe( data => {
      this.dialogRef.close('ok');
     }, err => {
      this.dialogRef.close('error');
    });
  }
}
