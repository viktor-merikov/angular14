import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {AuthorizationService} from '../../services/authorization.service';
import {UsersService} from '../../services/users.service';
import {NOTIFICATION_TYPE, NotificationService} from '../../services/notification.service';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog,
              public authorizationService: AuthorizationService,
              private notificationService: NotificationService,
              private usersService: UsersService) {
  }

  onLogin(): void {
    this.dialog.open(LoginComponent).afterClosed().subscribe(credentials => this.authorizationService.login(credentials).subscribe(token => {
      if (token) {
        this.authorizationService.user = credentials;
        this.notificationService.notify(NOTIFICATION_TYPE.SUCCESS, `Hello ${credentials.username}. Authorized successfully`);
      }
    }));
  }

  onRegistration(): void {
    this.dialog.open(RegistrationComponent).afterClosed().subscribe(credentials => this.usersService.create(credentials).subscribe(user => {
      console.log('Created', user.username);
    }));
  }

  onLogOut(): void {
    this.authorizationService.logout();
  }
}
