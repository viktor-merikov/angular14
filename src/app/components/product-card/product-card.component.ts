import {Component, Input} from '@angular/core';
import {Product} from '../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ProductViewComponent} from '../product-view/product-view.component';

@Component({
  selector: 'product',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  constructor(private dialog: MatDialog) {
  }

  @Input() product!: Product;

  onProductView(): void {
    this.dialog.open(ProductViewComponent, {
      width: '750px',
      data: this.product
    });
  }
}
