import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartProduct } from 'src/app/models/cartproduct';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalPrice: number = 0;
  fullname: string = '';
  address: string = '';
  creditcard: string = '';
  cartProducts: CartProduct[] = [];

  constructor(private router: Router, public cartService: CartService){}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartsWithProduct();
    this.totalPrice = this.cartService.getTotalAmountInCart();
  }

  oncheckOut(): void{
    const data: Checkout = {
      fullname: this.fullname,
      address: this.address,
      creditcard: parseInt(this.creditcard),
      totalPrice: this.totalPrice
    }
    this.cartService.setCheckoutFormData(data);

    // clear all the cart item
    this.cartService.deleteAllCart();

    this.router.navigate(['confirmation']);
  }

  updateCart(product_id: number, newQuantity: string){
    const cart: Cart = {
      product_id: product_id,
      quantity: parseInt(newQuantity)
    };

    if(cart.quantity < 1){
      // delete cartProducts from this component
      this.cartProducts = this.cartProducts.filter((item) => item.product_id != cart.product_id);

      // delete product from the cart in the CartService
      this.cartService.deleteCart(cart.product_id);
      alert(`Product removed from cart`);
    }else{
      this.cartService.addToCart(cart);
    }
    
    this.totalPrice = this.cartService.getTotalAmountInCart();
  }
}
