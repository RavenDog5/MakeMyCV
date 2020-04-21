import { Component, OnInit } from '@angular/core';
import { ProfilService } from './profil.service';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeatureCollection } from '../auth/auth.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user;
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    avatar: new FormControl(''),
    adresse: new FormControl(''),
    email: new FormControl('', Validators.email)
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

  genPass = 'Pas d\'idée de mot de passe ?';
  options = [];

  constructor(
    private accService: ProfilService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
   this.accService.getAccount(this.authService.userConnected.id).subscribe( res => {
     const noms = res.name.split(' ');
     this.form.patchValue({
       firstName: noms[0],
       lastName: noms[1],
       avatar: res.avatar,
       adresse: res.adresse
     });
    // this.user = res;
   }, err => console.error(err));
  }

  generatePassword(): void {
    if (this.form.value.password !== '') {
      this.form.patchValue({
        password: ''
      });
    }
    this.authService.getPasswordGenerated().subscribe( (res) => {

      this.form.patchValue({
        password:  res[0].password
      });
      const msg = 'Notez bien le mot de passe généré : ' + res[0].password + '\n Le mot de passe est directement renseigné 😉';
      this.snackbar.open(msg, 'C\'est noté !', {});
      this.genPass = 'Un autre mot de passe ?';
    }, err => console.error(err));
  }

  search(): void {
    setTimeout( () => {
      this.options = [];
      this.authService.getAdresseViaApi(this.form.value.address).subscribe( (res: FeatureCollection) => {
        if ( res != null) {
          res.features.forEach(element => {
            this.options.push(element.properties.label);
          });
        }
      }, err => console.error(err));
    }, 250);
  }

}
