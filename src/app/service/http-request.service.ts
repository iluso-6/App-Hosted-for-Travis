import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import {EpisodeModel} from '../models/EpisodeModel';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  access_token: string;

  // getters && setters for current episode
  episode: EpisodeModel;
  setEpisode(param ) {
    this.episode = param;
  }
  getEpisode() {
    return this.episode;
  }

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('service constructor');
    // get the token from storage for persistant api requests
    this.getStoredToken();
}

getStoredToken() {
  this.storage.get('access_token')
  .then((token_res) => {
      if (typeof token_res === 'undefined') {
        console.log('undefined access_token');
      } else {
        this.access_token = token_res['access_token'];
        console.log(this.access_token );
      }
  });
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


  getAccessToken (user, pass): Observable<any> {
    const body_data =
'grant_type=password&username=' + `${user}` + '&password=' + `${pass}`;

    return this.http.post(environment.LOGIN_URL, body_data , httpOptions)
      .pipe(
        tap(res => console.log('fetched token')),
        catchError(this.handleError('getAccessToken', []))
      );
  }



  getApiData(REQ_URL): Observable<any> {
    const token = this.access_token;
    const httpTokenHeader = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'Authorization': `bearer ${token}`
      }
      )
    };
    const URL = environment.BASE_URL + REQ_URL;
    return this.http.get(URL, httpTokenHeader)
      .pipe(
        tap(res => console.log('fetched data')),
        catchError(this.handleError('getApiData', []))
      );
  }

  
// console iteration of json object
 logObj(data) {
  for (const key in data) {
      if (data.hasOwnProperty(key)) {
          if (data[key] !== null && typeof data[key] === 'object') {
              data[key] = this.logObj(data[key]);
              console.log( '--------------Nested: ' + key);
          } else {
              if ( ! data[key]) {
                  data[key] = 'Not Specified';
              } else {
                console.log( key + ' : ' + data[key]);
              }
          }
      }
  }
  return data;
}

}
