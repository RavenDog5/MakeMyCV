import { Component, OnInit, ViewChild } from '@angular/core';
import { Skill } from './skills.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from './skills.service';
import { CreateSkillComponent } from './create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSkillComponent } from './delete/delete.component';
import { EditSkillComponent } from './edit/edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})

export class SkillsComponent implements OnInit {

  constructor(
    private skillService: SkillService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  displayedColumns: string[];
  SkillData: Skill[];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.getAll();
    this.displayedColumns = ['id', 'name', 'actions'];
  }

  // DIALOG CREATE
  openNewDialog(): void {
    const dialogRef = this.dialog.open(CreateSkillComponent, {
      width: '550px'
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result === 'ok' ) {
        this.snackbar.open('Compétence créée avec succès ! ✅', '', { duration: 3500, panelClass: ['snackbar-success']});
        this.getAll();
      } else if (result === 'alreadyExists') {
        this.snackbar.open('❌ La compétence existe déjà ❌', '', { duration: 3500, panelClass: ['snackbar-error']});
      }
      });
  }

  // DIALOG EDIT
  openEditDialog(skill: Skill): void {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '550px',
      data: {
        id: skill.id,
        name: skill.name
      }
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result === 'ok' ) {
        this.snackbar.open('Compétence modifiée avec succès ! ✅', '', { duration: 3500, panelClass: ['snackbar-success']});
        this.getAll();
      } else if (result === 'error') {
        this.snackbar.open('❌ Il y a eu une erreur lors de la création ❌', '', { duration: 3500, panelClass: ['snackbar-error']});
      }
      });
  }

  // DIALOG DELETE
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteSkillComponent, {
      width: '350px',
      data: {
        idUser: id,
      }
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result === 'ok' ) {
        this.snackbar.open('Compétence supprimée avec succès ! ✅', '', { duration: 3500, panelClass: ['snackbar-success']});
        this.getAll();
      }
    });
  }


   private getAll(): void {
    this.skillService.getAll()
      .subscribe( (data: any) => {
        if (data != null) {
          // console.log('Skills : ', data.skills);
          this.dataSource = new MatTableDataSource<Skill>(data.skills);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, err => console.error(err));
  }
}
