import { Component, OnInit } from '@angular/core';
import { Skill } from '../skills.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../skills.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateSkillComponent {

  hide = true;
  newSkill: Skill = new Skill();

  constructor(
    public dialogRef: MatDialogRef<CreateSkillComponent>,
    private skillService: SkillService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(skill: Skill): void {
    this.skillService.add(skill)
    .subscribe( data => { }, err => console.error(err));
    this.dialogRef.close('ok');
  }


}
