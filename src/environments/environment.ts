// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  TOKEN: 'token',
//  BASE_URL: 'https://openfitapi.groupnos.com/api/',
//  LOGIN_URL: 'https://openfitapi.groupnos.com/token',
  BASE_URL: 'https://openfitapi-docs.azurewebsites.net/api/',
  LOGIN_URL: 'https://openfitapi-docs.azurewebsites.net/token',
  CLIENTAPI_GET: 'ClientApi/Get',
  USERAPI_GET: 'UserApi/Get',
  SESSIONAPI_GET: 'SessionApi/Get',
  GET_EPISODE_ExternalKey: 'EpisodeApi/Get/',
  GET_SURVEY_PDF_FILE: 'api/ReportApi/ExportSurveyReportToPdf',
  GET_CLIENT_ID: 'AccountApi/GetClientIdByAccessToken',
  GET_EPISODE: 'EpisodeApi/Get',
  GET_CLIENT_ORS_REPORT: 'ClientApi/GetClientsORSReport',
  PUT_EPISODE: 'EpisodeApi/Put',
  POST_EPISODE: 'EpisodeApi/Post',
  GET_ORS_ANSWERS: 'ClientApi/GetORSAnswers',
  DELETE_EPISODE: 'EpisodeApi/Delete/'
};


// https://openfitapi-falke.azurewebsites.net/api/ClientApi/GetORSAnswers?languageCode=US&clientId=136925&episodeId=134741&includeCollateralData=false
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
