import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Token, User} from '../models/user';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {NOTIFICATION_TYPE, NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private _token: string | null = null;
  private _user: Partial<User> | null = null;

  private readonly LOGIN_URL = "https://fakestoreapi.com/auth/login";

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) {
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
        catchError(this.errorHandler),
        tap(t => {
          this._token = t;
          localStorage.setItem(this.TOKEN_KEY, this._token);
        })
      );
  }

  private errorHandler = (error: HttpErrorResponse) => {
    this.notificationService.notify(NOTIFICATION_TYPE.FAIL, error.status == 401 ? 'Wrong credentials' : error.message);
    return throwError(() => error.message);
  }
}
