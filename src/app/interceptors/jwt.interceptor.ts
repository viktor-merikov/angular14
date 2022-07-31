import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../services/authorization.service';
import {Injectable} from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authorizationService.token && this.authorizationService.user) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${this.authorizationService.token}`}
      })
    }
    return next.handle(req);
  }
}
