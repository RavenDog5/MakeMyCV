import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { FormationService } from './formation.service';
import { Formation } from './formation.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private formationService: FormationService
  ) { }

  displayedColumns: string[];
  FormationData: Formation[];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.getAll();
    this.displayedColumns = ['id', 'name', 'location', 'yearStart', 'yearEnd', 'description', 'actions'];
  }



  private getAll(): void {
    this.formationService.getAll(this.authService.userConnected.id)
      .subscribe( (res: any) => {
        if (res != null) {
          this.dataSource = new MatTableDataSource<Formation>(res.formations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, err => console.error(err));
  }

  // NEW FORMATION
  newFormation(): void {
    this.router.navigate(['formation/create']);
  }

  // EDIT FORMATION
  editFormation(formation: Formation): void {
    this.formationService.stock = formation;
    this.router.navigate(['formation/edit']);
  }

  // DELETE FORMATION
  openDeleteDialog(id: number): void {

    const dialogRef = this.dialog.open(Formation, {
      width: '350px',
      data: {
        idUser: id,
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result === 'ok') {
        this.snackbar.open('Formation supprimée avec succès ! ✅', '', {duration: 3500, panelClass: ['snackbar-success']});
      }
    });
  }

}
