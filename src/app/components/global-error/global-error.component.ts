import {Component} from '@angular/core';
import {ErrorService} from '../../services/error.service';

@Component({
  selector: 'global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent {

  constructor(public errorService: ErrorService) {
  }

}
