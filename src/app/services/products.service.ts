import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../models/product';
import {catchError, delay, Observable, retry, throwError} from 'rxjs';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly PRODUCT_URL = 'https://fakestoreapi.com/products/';

  constructor(private httpClient: HttpClient,
              private errorService: ErrorService) {
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.PRODUCT_URL, product);
  }

  getOne(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.PRODUCT_URL + id);
  }

  getLimit(limit: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_URL, {params: {limit}})
      .pipe(
        delay(500),
        retry(2),
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_URL);
  }

  private errorHandler = (error: HttpErrorResponse) => {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }

}
