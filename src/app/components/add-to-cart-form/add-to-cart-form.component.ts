import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart-form',
  templateUrl: './add-to-cart-form.component.html',
  styleUrls: ['./add-to-cart-form.component.css', '../product-item/product-item.component.css']
})
export class AddToCartFormComponent {
  public quantity: number = 1;
  @Input() product: Product;
  // @Output() totalCart: EventEmitter<number> =  new EventEmitter();

  constructor(private cartService: CartService){
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      category: '',
      description: ''
    };
  }

  cartSubmit():void{
    const cart: Cart = {
      product_id: this.product.id,
      quantity: parseInt(this.quantity.toString())
    };
    this.cartService.addToCart(cart);
    alert(`${cart.quantity} quantity of ${this.product.name} added to cart`);

    // this.cartQty();

    // clear quantity
    this.quantity = 1;
  }

  // cartQty():void{
  //   const newCarts = this.cartService.getCarts();

  //   let cartQuantity: number = 0;

  //   newCarts.forEach((cart, index, all) => {
  //     cartQuantity += cart.quantity;
  //   });

  //   // emit new cart Qty
  //   // this.totalCart.emit(cartQuantity);
  // }
}
