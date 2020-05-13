import { Component, OnInit, ViewChild } from '@angular/core';
import { ExperienceService } from './experience.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Experience } from './experience.model';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteExperienceComponent } from './delete/delete.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  constructor(
    private experienceService: ExperienceService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  displayedColumns: string[];
  ExperienceData: Experience[];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.getAll();
    this.displayedColumns = ['id', 'name', 'startDate', 'endDate', 'description', 'actions'];
  }

  private getAll(): void {


    this.experienceService.getAll(this.authService.userConnected.id)
      .subscribe ( (data: any) => {
        if (data != null) {
          // console.log('Experience : ', data.experiences);
          this.dataSource = new MatTableDataSource<Experience>(data.experiences);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, err => console.error(err));
  }


  // NEW
  newExperience(): void {
    this.router.navigate(['experiences/create']);
  }

    // EDIT
    editExperience(experience: Experience): void {
      this.experienceService.stockData = experience;
      this.router.navigate(['experiences/edit']);
    }

    // DIALOG DELETE
    openDeleteDialog(id: number): void {
      const dialogRef = this.dialog.open(DeleteExperienceComponent, {
        width: '350px',
        data: {
          idUser: id,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'ok' ) {
          this.snackbar.open('Expérience supprimée avec succès ! ✅', '', { duration: 3500, panelClass: ['snackbar-success']});
          this.getAll();
        }
      });
    }

}
