import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillService } from '../skills.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteSkillComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private skillService: SkillService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(idToDelete): void {
    this.skillService.remove(idToDelete.idUser)
    .subscribe( response => {
      console.log(response);
    }, err => console.error(err));
    this.dialogRef.close('ok');
  }

}
