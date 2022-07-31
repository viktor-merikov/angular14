import {Component, Inject} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NOTIFICATION_TYPE, NotificationService} from '../../services/notification.service';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  quantity = 1;

  constructor(private cartService: CartService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public product: Product) {
  }

  onAddToCart(): void {
    this.cartService.addToCart({product: this.product, quantity: this.quantity});
    this.notificationService.notify(NOTIFICATION_TYPE.INFO, `Added to cart`)
  }
}
