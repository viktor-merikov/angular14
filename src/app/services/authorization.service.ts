import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token, User} from '../models/user';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private _token: string | null = null;
  private _user: Partial<User> | null = null;

  private readonly LOGIN_URL = "https://fakestoreapi.com/auth/login";

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem(this.USER_KEY);
    if (token) {
      this._token = token;
    }
    if (user) {
      this._user = JSON.parse(user);
    }
  }

  get token(): string | null {
    return this._token;
  }

  get user(): Partial<User> | null {
    return this._user;
  }

  set user(user: Partial<User> | null) {
    this._user = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(this._user));
  }

  isAuthenticated(): boolean {
    return !!this._token && !!this._user;
  }

  logout(): void {
    this._token = null;
    localStorage.removeItem(this.TOKEN_KEY);
    this._user = null;
    localStorage.removeItem(this.USER_KEY);
  }

  login(credentials: Partial<User>): Observable<Token> {
    return this.httpClient
      .post<{token: string}>(this.LOGIN_URL, {username: credentials.username, password: credentials.password})
      .pipe(
        map(t => t.token),
        tap(t => {
          this._token = t;
          localStorage.setItem(this.TOKEN_KEY, this._token);
        })
      );
  }
}
