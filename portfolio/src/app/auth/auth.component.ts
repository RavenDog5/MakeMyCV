import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


export interface FeatureCollection {
  type: string;
  version: string;
  features: any;
  attribution: string;
  licence: string;
  query: string;
  filters: any;
  limit: number;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogged = false;
  hide = true;
  options = [];
  newUser: User;
  genPass = 'Pas d\'idée de mot de passe ?';
  // FORMS CONTROL
  loginForm = new FormGroup({
    email: new FormControl('',  Validators.email),
    password: new FormControl('', Validators.required),
  });

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    avatar: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  avatars = [
    { label: 'Le Diable', img : '../../assets/avatar/devil.png'},
    { label: 'Hipster bleu', img : '../../assets/avatar/hipster_blue.png'},
    { label: 'Un homme', img : '../../assets/avatar/man.png'},
    { label: 'Un serial killer', img : '../../assets/avatar/serial_killer.png'},
    { label: 'Un guerrier', img : '../../assets/avatar/warrior.png'},
    { label: 'Une femme', img : '../../assets/avatar/woman.png'},
    { label: 'Une autre femme', img : '../../assets/avatar/woman_1.png'},
  ];


  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router) { }


    ngOnInit(): void {
      if (this.authService.isLoggedIn()) {
        this.isLogged = true;
      }
    }

  generatePassword(): void {
    if (this.registerForm.value.password !== '') {
      this.registerForm.patchValue({
        password: ''
      });
    }
    this.authService.getPasswordGenerated().subscribe( (res) => {
      this.registerForm.patchValue({
        password:  res[0].password
      });
      const msg = 'Notez bien le mot de passe généré : ' + res[0].password + '\n Le mot de passe est directement renseigné 😉';
      this.snackbar.open(msg, 'C\'est noté !', {panelClass: ['snackbar-success']});
      this.genPass = 'Un autre mot de passe ?';
    }, err => console.error(err));
  }

  login(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(res => {
      // console.log('resultat : ', res);
      this.authService.setSession(res);
      this.router.navigate(['dashboard']);
    }, err => {
      console.log('ERREUR ', err);
      if (err.status === 401) {
        const message = ' ❌🙅‍♀️ Utilisateur inconnu';
        this.snackbar.open(message, '', {panelClass: ['snackbar-error'], duration: 2500});
      }
    });
  }

  register(): void {
    this.newUser = {
      username: this.registerForm.value.username,
      avatar: this.registerForm.value.avatar,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password
    };
    // console.log('REGISTER : ');
    // console.log(this.newUser);
    this.registerForm.clearValidators();
    this.registerForm.reset();
    // console.log(this.newUser);
    this.authService.register(this.newUser)
    .subscribe( () => {
      const message = 'Utilisateur créé avec succès ! Vous pouvez vous connecter maintenant 😉';
      this.snackbar.open( message, 'Ok !', {panelClass: ['snackbar-success'], duration: 3000});
    }, err => {
      if (err.status === 400) {
        const message = 'L\'email ou le pseudo est déjà existant, veuillez réessayer. ❌';
        this.snackbar.open( message, 'Ok !', {panelClass: ['snackbar-error'], duration: 3000});
      }
    });
  }

  reset() {
    this.registerForm.reset();
    this.registerForm.clearValidators();
    this.loginForm.reset();
    this.loginForm.clearValidators();
    this.genPass = 'Pas d\'idée de mot de passe ?';
  }

  Disconnect(): void {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['auth']);
  }

  // void
  search(): void {
    setTimeout( () => {
      this.options = [];
      this.authService.getAdresseViaApi(this.registerForm.value.address).subscribe( (res: FeatureCollection) => {
        if ( res != null) {
          res.features.forEach(element => {
            this.options.push(element.properties.label);
          });
        }
      }, err => console.error(err));
    }, 250);
  }

}
