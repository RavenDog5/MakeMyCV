import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// SKILL
import { SkillsComponent } from './skills/skills.component';
import { CreateSkillComponent } from './skills/create/create.component';
import { EditSkillComponent } from './skills/edit/edit.component';
import { DeleteSkillComponent } from './skills/delete/delete.component';

// EXPERIENCE
import { ExperiencesComponent } from './experiences/experiences.component';
import { CreateExperienceComponent } from './experiences/create/create.component';
import { EditExperienceComponent } from './experiences/edit/edit.component';
import { DeleteExperienceComponent } from './experiences/delete/delete.component';

// FORMATION
import { FormationComponent } from './formation/formation.component';
import { CreateFormationComponent } from './formation/create/create.component';
import { EditFormationComponent } from './formation/edit/edit.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth/auth.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    ExperiencesComponent,
    AuthComponent,
    CreateSkillComponent,
    EditSkillComponent,
    DeleteSkillComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AboutComponent,
    NavigationComponent,
    ProfilComponent,
    CreateExperienceComponent,
    EditExperienceComponent,
    DeleteExperienceComponent,
    FormationComponent,
    CreateFormationComponent,
    EditFormationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    MatChipsModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  entryComponents: [

  ],
  providers: [
    AuthService,
    AuthGuard,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
