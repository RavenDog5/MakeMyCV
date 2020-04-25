import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { ProfilComponent } from './profil/profil.component';
import { CreateExperienceComponent } from './experiences/create/create.component';
import { EditExperienceComponent } from './experiences/edit/edit.component';


export const routes: Routes = [
  { path: 'skills', component: SkillsComponent, canActivate: [AuthGuard]},
  { path: 'experiences', component: ExperiencesComponent, canActivate: [AuthGuard]},
  { path: 'experiences/create', component: CreateExperienceComponent, canActivate: [AuthGuard]},
  { path: 'experiences/edit', component: EditExperienceComponent, canActivate: [AuthGuard]},
  { path: 'account', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: '**' , component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
