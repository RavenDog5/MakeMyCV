import { Component, OnInit } from '@angular/core';
import { ProfilService } from './profil.service';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeatureCollection } from '../auth/auth.component';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user;
  form = new FormGroup({
    id: new FormControl(''),
    username: new FormControl(''),
    avatar: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)])
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
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.accService.getAccount(this.authService.userConnected.email).subscribe( res => {
    //  console.log('resultat PROFIL : ', res );
     this.form.patchValue({
      id: res.id,
      username: res.username,
      email: res.email,
      avatar: res.avatar,
      address: res.address,
      phone: res.phone
     });
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

  reset(): void {
    this.form.clearValidators();
    this.form.reset();
  }

  submit(): void {
    const updatedUser = {
      id: this.form.value.id,
      username: this.form.value.username,
      avatar: this.form.value.avatar,
      address: this.form.value.address,
      email: this.form.value.email,
      phone: this.form.value.phone,
    };

    this.accService.updateAccount(updatedUser.id, updatedUser).subscribe( (res) => {
      console.log('resultat de la mise à jour', res);
      const message = 'Mise à jour du profil faite ! ✅ ';
      const infoMessage = 'Important ! pour voir les changements, merci de vous reconnecter.';
      // this.snackbar.open(message, '', {duration: 1500, panelClass: ['snackbar-success']});
      this.snackbar.open(message + '\n' + infoMessage, 'Compris !', { panelClass: ['snackbar-info']});
    }, err => { console.log('ERREUR : ', err); });
    this.router.navigate(['dashboard']);
  }

}
