import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../models/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(value: Product[], search: string): Product[] {
    return !!search ? value.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : value;
  }

}
