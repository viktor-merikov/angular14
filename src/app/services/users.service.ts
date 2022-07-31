import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly USERS_URL = "https://fakestoreapi.com/users";

  constructor(private httpClient: HttpClient) {
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.USERS_URL, JSON.stringify(user)).pipe(tap(u => console.log('create', u)));
  }
}
