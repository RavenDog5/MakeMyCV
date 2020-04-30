import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormationService } from '../formation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteFormationComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteFormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formationService: FormationService,
    private snackbar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(idToDelete): void {
    this.formationService.remove(idToDelete.idUser)
    .subscribe( response => {
      const message = `Formation supprimée avec succès ! ✅`;
      this.snackbar.open(message, '', {duration: 3500, panelClass: ['snackbar-success']});
      this.dialogRef.close('ok');
    }, err => {
      const errorMsg = '❌ Erreur lors de la suppression ❌ : ' + err;
      this.snackbar.open(errorMsg, '', {duration: 3500, panelClass: ['snackbar-error']});
    });
  }

}
