import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { CartProduct } from '../models/cartproduct';
import { Checkout } from '../models/checkout';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private checkoutData: Checkout = {
    fullname: '',
    address: '',
    creditcard: 0,
    totalPrice: 0
  };
  // totalPrice: number[] = [];

  constructor(private httpService: HttpService) {

  }

  private cartDataSource = new BehaviorSubject(this.getCarts());
  currentCarts = this.cartDataSource.asObservable();

  private checkoutDataSource = new BehaviorSubject(this.checkoutData);

  // add new product and update existing product in the cart
  addToCart(item: Cart): void {
    // get carts from local storage
    const cartStorage: Cart[] = this.getCarts();

    const itemExist = cartStorage.find((value, index, all) => {
      return value.product_id == item.product_id;
    });

    if (itemExist) {
      itemExist.quantity = item.quantity;
    } else {
      cartStorage.unshift(item);
    }

    // update carts with updates
    localStorage.setItem('carts', JSON.stringify(cartStorage));

    // observe getCarts() for changes
    this.cartDataSource.next(this.getCarts());

  }

  // delete product from cart
  deleteCart(product_id: number): void {
    const cartStorage = this.getCarts().filter((item) => item.product_id != product_id);
    // update carts with updates
    localStorage.setItem('carts', JSON.stringify(cartStorage));

    // observe getCarts() for changes
    this.cartDataSource.next(this.getCarts());
  }

  deleteAllCart(){
    localStorage.removeItem('carts');
    // observe getCarts() for changes
    this.cartDataSource.next(this.getCarts());
  }

  getTotalAmountInCart(): number {
    const totalPrice: number[] = [];
    
    this.getCarts().forEach(async(item) => {
      const product = await this.httpService.getProduct(item.product_id);
      // this.totalPrice.push(product.price * item.quantity);
      totalPrice.push(product.price * item.quantity);
    });

    return this.sumArr(totalPrice);
  }

  sumArr(arr: number[]): number{
    return arr.reduce((pre, item) => pre + item);
  }

  getCarts(): Cart[] {
    const carts: Cart[] = JSON.parse(localStorage.getItem('carts') as string) ?? [] ;
    return carts;
  }

  getCartsWithProduct(): CartProduct[] {
    const pC: CartProduct[] = [];
      // Promise<CartProduct[]>
    this.getCarts().forEach(async(item) => {
      const product = await this.httpService.getProduct(item.product_id);
      pC.unshift({
        product_id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: item.quantity,
        url: product.url,
        description: product.description
      });
    });

    return pC;
  }

  setCheckoutFormData(data: Checkout){
    this.checkoutData = data;
    this.checkoutDataSource.next(this.checkoutData);
  }
  getCheckoutFormData(): Observable<Checkout>{
    return this.checkoutDataSource.asObservable();
  }

}
