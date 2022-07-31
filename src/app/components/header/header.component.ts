import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private readonly TOKEN_KEY = 'token';
  token?: string;

  constructor(private dialog: MatDialog,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.token = token;
    }
  }

  onLogin(): void {
    this.dialog.open(LoginComponent).afterClosed().subscribe(credentials => this.authorizationService.login(credentials).subscribe(token => {
      if (token) {
        this.token = token;
        localStorage.setItem(this.TOKEN_KEY, this.token);
      }
    }));
  }

  onRegistration(): void {
    this.dialog.open(RegistrationComponent).afterClosed().subscribe(credentials => {
      console.log('User registration credentials: ', credentials);
    });
  }

  onLogOut(): void {
    this.token = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
