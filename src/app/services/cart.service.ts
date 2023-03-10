import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartProduct } from '../models/cartproduct';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItem: Cart[] = [];
  constructor(private httpService: HttpService) { }

  private cartDataSource = new BehaviorSubject(this.cartItem);
  currentCarts = this.cartDataSource.asObservable();

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

  getTotalAmountInCart(): number {
    let totalPrice: number = 0;

    this.cartItem.forEach(async (item) => {
      const product = await this.httpService.getProduct(item.product_id);
      totalPrice += product.price;
    });
    return totalPrice;
  }

  // delete product from cart
  deleteCart(product_id: number): void {
    this.cartItem = this.cartItem.filter((item) => item.product_id != product_id);
    this.cartDataSource.next(this.cartItem);
  }

  getCarts(): Cart[] {
    return this.cartItem;
  }

  async getCartsWithProduct(): Promise<CartProduct[]> {
    const pC: CartProduct[] = [];
    // Promise<CartProduct[]>
    this.cartItem.forEach(async (item) => {
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

}
