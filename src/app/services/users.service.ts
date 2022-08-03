import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly USERS_URL = "/users";

  constructor(private httpClient: HttpClient) {
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.USERS_URL, user);
  }
}
