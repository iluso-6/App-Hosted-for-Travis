import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { EpisodeModel } from '../models/EpisodeModel';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
 })
};



const sample_put_body = {'Id': 138303, 'ExternalKey': 'cafac4a8-dc21-41da-b4e9-9e0573e83990', 'EpisodeTypeId': 1,
'EpisodeType': {'Id': 1, 'Name': 'Individual'},
'StartDate': '2019-01-07T00:00:00', 'EpisodeStatus': {'Id': 1, 'Name': 'Open'},
'EpisodeStatusId': 1,
'case_referral': 'Ask about this', 'case_payer': 'Medicare',
'treatement_settings': 'Ask about this', 'level_of_care': 'Ask about this',
'Description': 'desc here', 'case_tags': '', 'existing_client': 'Ask about this'};

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  // used to keep track of data changes regarding refreshing page data globally passed variable
  data_is_altered = false;

  access_token: string;

  // getters && setters for current episode
  episode: EpisodeModel;
  setEpisode(param) {
    this.episode = param;
  }
  getEpisode() {
    return this.episode;
  }

  setDataIsAltered(state) {
    this.data_is_altered = state;
  }

  getDataIsAltered() {
    const temp = this.data_is_altered;
    this.data_is_altered = false;
    return temp;
  }

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('service constructor');
    // get the token from storage for persistant api requests
    this.getStoredToken();
  }

  getStoredToken() {
    this.storage.get('access_token').then(token_res => {

     if (token_res && token_res['access_token'] != null) {
        this.access_token = token_res['access_token'];
        console.log(this.access_token);
      } else {
        console.log('No access token stored');
      }
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAccessToken(user, pass): Observable<any> {
    const newhttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
     })
    };

    const params = new HttpParams()
    .append('username', user)
    .append('password', pass)
    .append('grant_type', 'password');

    return this.http.post(environment.LOGIN_URL, params, newhttpOptions).pipe(
      tap(res => console.log('fetched token')),
      catchError(this.handleError('getAccessToken', []))
    );
  }

  getApiData(REQ_URL): Observable<any> {
    const token = this.access_token;
    const httpTokenHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `bearer ${token}`
      })
    };
    const URL = environment.BASE_URL + REQ_URL;
    return this.http.get(URL, httpTokenHeader).pipe(
      tap(res => console.log('fetched data')),
      catchError(this.handleError('getApiData', []))
    );
  }

  putApiData(REQ_URL, body): Observable<any> {
    const token = this.access_token;
    //   console.log(token);
    const httpTokenHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `bearer ${token}`
      })
    };
    const URL = environment.BASE_URL + REQ_URL;
    return this.http.put(URL, body, httpTokenHeader).pipe(
      tap(_ => console.log('updated product')),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  postApiData(URL_ENDPOINT): Observable<any> {
    const token = this.access_token;
    const URL = environment.BASE_URL + URL_ENDPOINT;
    const httpTokenHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `bearer ${token}`
      })
    };
    return this.http.post(URL, sample_put_body, httpTokenHeader).pipe(
      tap(res => console.log('post  data')),
      catchError(this.handleError('postApiData', []))
    );
  }

  deleteApiData(Id): Observable<any> {
    const URL = environment.BASE_URL + environment.DELETE_EPISODE + Id;
    const token = this.access_token;
    const httpTokenHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `bearer ${token}`
      })
    };
    return this.http.delete<any>(URL, httpTokenHeader).pipe(
      tap(_ => console.log(`deleted product id=${Id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  // console iteration of json object
  logObj(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== null && typeof data[key] === 'object') {
          data[key] = this.logObj(data[key]);
          console.log('--------------Nested: ' + key);
        } else {
          if (!data[key]) {
            data[key] = 'Not Specified';
          } else {
            console.log(key + ' : ' + data[key]);
          }
        }
      }
    }
    return data;
  }
}
