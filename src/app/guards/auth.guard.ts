import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';
import {NOTIFICATION_TYPE, NotificationService} from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authorizationService: AuthorizationService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authorizationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']).then(() => this.notificationService.notify(NOTIFICATION_TYPE.FAIL, 'Unauthorized. Please log in.'));
      return false;
    }
  }

}
