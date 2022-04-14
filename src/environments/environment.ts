// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  API_LOCAL: 'http://localhost:8080/',

  firebase: {
    apiKey: "AIzaSyDukML_SMHPWFqJ0cWrN9tsEfQBY4GDQaE",
    authDomain: "codygym-23881.firebaseapp.com",
    databaseURL: "https://codygym-23881-default-rtdb.firebaseio.com/",
    projectId: "codygym-23881",
    storageBucket: "codygym-23881.appspot.com",
    messagingSenderId: "628084917931",
    appId: "1:628084917931:web:3c15788f2f4ede62b559ee",
    measurementId: "G-HXQ7HH53FV"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
