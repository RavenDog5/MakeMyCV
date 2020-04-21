import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../auth/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, DoCheck {

  title = 'Portfolio';
  routes: any;
  userLogged: any = null;
  logged = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    );

    ngOnInit(): void {
      if (localStorage.getItem('idToken') != null) {
        localStorage.removeItem('idToken');
      }
      this.refreshRoutes();
    }
    // Refresh le composant !
    ngDoCheck(): void {
      this.refreshRoutes();
    }

    private refreshRoutes(): void {
      if (this.authService.isLoggedIn()) {
        this.userLogged = this.nav.getUserConnected();
        this.logged = true;
        this.routes = this.nav.getRoutes();
        // console.log('user connected : ', this.userLogged);
        // Récupérer les données de l'utilisateur
      } else {
        this.routes = this.nav.getRoutes();
        this.logged = false;
        this.userLogged = null;
      }
    }

    async logout() {
      await this.authService.logout();
      this.router.navigate(['auth']);
    }

    constructor(
      private breakpointObserver: BreakpointObserver,
      private authService: AuthService,
      private nav: NavigationService,
      private router: Router
      ) { }
}
