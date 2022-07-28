import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  })

  constructor(private productService: ProductsService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  get title() {
    return this.form.controls.title as FormControl;
  }

  onCreateProduct() {
    const newProduct: Product = {
      title: this.title.value,
      description: 'New description',
      image: '',
      category: '',
      price: 0,
      rating: {
        rate: 0,
        count: 0
      }
    }
    this.productService.create(newProduct).subscribe(() => this.modalService.close());
  }
}
