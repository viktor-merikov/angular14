import {Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Product} from '../../models/product';
import {ProductsService} from '../../services/products.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'product-view',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  title = 'Angulae 14 + Tilewind';
  loading = false;
  products$!: Observable<Product[]>;
  search = '';

  constructor(private productsService: ProductsService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.products$ = this.productsService.getLimit(5).pipe(tap(() => this.loading = false));
  }

}
