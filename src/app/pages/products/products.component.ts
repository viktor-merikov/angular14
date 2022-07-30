import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';
import {ProductsService} from '../../services/products.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'product-view',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$!: Observable<Product[]>;
  search = '';

  constructor(private productsService: ProductsService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getAll();
  }

}
