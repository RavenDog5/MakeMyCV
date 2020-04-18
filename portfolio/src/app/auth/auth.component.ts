import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    avatar: new FormControl(''),
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
      this.snackbar.open(msg, 'C\'est noté !', {});
      this.genPass = 'Un autre mot de passe ?';
    }, err => console.error(err));
  }

  login(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(res => {
      this.authService.setSession(res);
      this.router.navigate(['dashboard']);
    }, err => console.error(err));
  }

  register(): void {
    this.newUser = {
      name: this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName,
      avatar: this.registerForm.value.avatar,
      email: this.registerForm.value.email,
      adresse: this.registerForm.value.address,
      password: this.registerForm.value.password,
      experiences: [],
      competences: []
    };
    console.log('REGISTER : ');
    console.log(this.newUser);
    this.registerForm.reset();
    // console.log(newUser);
    // this.authService.register(newUser)
    // .subscribe( () => {
    //   this.snackbar.open('Utilisateur créé avec succès ! Vous pouvez vous connecter maintenant 😉', 'Ok !');
    // }, err => console.error(err));
  }

  reset() {
    this.registerForm.reset();
    this.loginForm.reset();
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
