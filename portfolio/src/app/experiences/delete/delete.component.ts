import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceService } from '../experience.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDelete } from 'src/app/interfaces/delete.interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteExperienceComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDelete,
    private experienceService: ExperienceService,
    private snackbar: MatSnackBar
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(idToDelete): void {
    this.experienceService.remove(idToDelete.idUser)
    .subscribe( () => {
      const message = `Experience supprimée avec succès ! ✅`;
      this.snackbar.open(message, '', {duration: 3500, panelClass: ['snackbar-success']});
    }, err => {
      const errorMsg = 'Something went wrong ... ' + err;
      this.snackbar.open(errorMsg, '', {duration: 3200, panelClass: ['snackbar-error']});
    });
    this.dialogRef.close('ok');
  }

}
