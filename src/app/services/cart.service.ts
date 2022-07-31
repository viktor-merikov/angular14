import {Injectable} from '@angular/core';
import {Product} from '../models/product';

export interface CartItem {
  product: Product,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = 'cart';
  private readonly _cart: CartItem[] = [];

  constructor() {
    const cart = sessionStorage.getItem(this.CART_KEY);
    if (cart) {
      this._cart = JSON.parse(cart);
    }
  }

  get cart(): CartItem[] {
    return this._cart;
  }

  addToCart(cartItem: CartItem): void {
    const index = this._cart.findIndex(i => i.product.id === cartItem.product.id);
    if (index > -1) {
      this._cart[index].quantity = this._cart[index].quantity + cartItem.quantity;
    } else {
      this._cart.push(cartItem);
    }
    sessionStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
  }

  removeItemFromCart(productId: number): void {
    const index = this._cart.findIndex(i => i.product.id === productId);
    if (index > -1) {
      this._cart.splice(index, 1);
      sessionStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
    }
  }

}
