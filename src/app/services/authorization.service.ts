import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token, User} from '../models/user';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly LOGIN_URL = "fakestoreapi.com/auth/login";

  constructor(private httpClient: HttpClient) {
  }

  login(credentials: Partial<User>): Observable<Token> {
    console.log('User login credentials: ', credentials);
    return this.httpClient
      .post<{token: string}>(this.LOGIN_URL, {username: credentials.username, password: credentials.password})
      .pipe(map(t => t.token));
  }

  registration(credentials: User): void {
    console.log('User registration credentials: ', credentials);
  }
}
