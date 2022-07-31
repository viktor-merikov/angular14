import {Component} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cartService: CartService) {
  }

  onGetTotalPrice(): number {
    return this.cartService.cart.map(i => i.product.price * i.quantity).reduce((item1, item2) => item1 + item2, 0);
  }

  onRemove(id: number | undefined): void {
    if (id) {
      this.cartService.removeItemFromCart(id);
    }
  }
}
