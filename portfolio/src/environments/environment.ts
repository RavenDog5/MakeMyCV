// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  assets : '../../assets/',
  routes: {
    logged: [
        { label: 'Compétences', path: 'skills', icon: 'explore'},
        { label: 'Experiences', path: 'experiences', icon: 'work'},
        { label: 'Tableau de bord', path: 'dashboard', icon: 'dashboard'},
    ],
    notLogged: [
    {label: 'Connexion', path: 'auth', icon: 'person' }
    ]
  },
  Api : {
    entrypoint : 'http://localhost:3009',
    endpoints : {
      skills : 'competences',
      account : 'user',
      experiences : 'experiences',
      login: 'user/login',
      register: 'user',
      adress: 'utils/address',
      password: 'utils/password'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
