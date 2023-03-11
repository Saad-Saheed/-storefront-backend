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
  totalPrice: number[] = [];
  public cartItem: Cart[] = [{ product_id: 1, quantity: 1 }, { product_id: 3, quantity: 2 }, { product_id: 2, quantity: 1 }];

  constructor(private httpService: HttpService) {

  }

  private cartDataSource = new BehaviorSubject(this.cartItem);
  currentCarts = this.cartDataSource.asObservable();

  private checkoutDataSource = new BehaviorSubject(this.checkoutData);

  // add new product and update existing product in the cart
  addToCart(item: Cart): void {

    const itemExist = this.cartItem.find((value, index, all) => {
      return value.product_id == item.product_id;
    });

    if (itemExist) {
      itemExist.quantity = item.quantity;
    } else {
      this.cartItem.unshift(item);
    }

    this.cartDataSource.next(this.cartItem);
    // return this.cartItem;
  }



  // delete product from cart
  deleteCart(product_id: number): void {
    this.cartItem = this.cartItem.filter((item) => item.product_id != product_id);
    this.cartDataSource.next(this.cartItem);
  }

  getTotalAmountInCart() {
    // const totalPrice: number[] = [];
    this.totalPrice = [];
    this.cartItem.forEach(async(item) => {
      const product = await this.httpService.getProduct(item.product_id);
      this.totalPrice.push(product.price * item.quantity);
      // totalPrice.push(product.price * item.quantity);
    });

    // return this.sumArr(totalPrice);
  }

  sumArr(arr: number[]): number{
    return arr.reduce((pre, item) => pre + item);
  }

  getCarts(): Cart[] {
    return this.cartItem;
  }

  getCartsWithProduct(): CartProduct[] {
    const pC: CartProduct[] = [];
      // Promise<CartProduct[]>
    this.cartItem.forEach(async(item) => {
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
