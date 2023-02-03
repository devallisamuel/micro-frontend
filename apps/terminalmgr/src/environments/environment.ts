// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServer: 'https://services.kredete.dev/',
  idServer: 'https://identity.kredete.dev',
  returnUrl: 'http://localhost:4000',
  useBackend: true,
  apiLocal: '/api',
  clientId: 'KredeteAdminAngularClient',
  scope: 'KredeteNodeApi KredetePyApi openid profile offline_access',
  responseType: 'id_token token',
  apiUploadFolder: 'http://192.168.1.19/api/uploads',
  b1Server: 'http://localhost:39930/api',
  prompt: 'none',
  userPermission: true,
  transportType: 0,

  data: '',
  hubUrl: '',
  logLevel: '',
  isLogLevelDebugEnabled: false,
  isLogLevelWarningEnabled: false,
  appFooter: '',
  reportDesignerUrl: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
