import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../skills.model';
import { SkillService } from '../skills.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditSkillComponent {

  hide = true;

  constructor(
    public dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillService: SkillService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(skill: Skill): void {
    this.skillService.edit(skill)
    .subscribe( data => { }, err => console.error(err));
    this.dialogRef.close('ok');
  }
}
