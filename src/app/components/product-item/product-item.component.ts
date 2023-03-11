import { Component, Input, OnInit } from '@angular/core';
import  * as Sicon  from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from 'src/app/app.component';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  base_url = '';
  @Input() product: Product;
  Sicon = Sicon;
  // cartQ: number = 0;
  // @Output() currenCartQty: EventEmitter<number> = new EventEmitter();

  constructor(private cartService: CartService, private app: AppComponent) {
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      category: '',
      description: ''
    };
  }

  ngOnInit(): void {
    this.base_url = this.app.base_url;
  }

  productToCart(cart: Cart){
    this.cartService.addToCart(cart);
    alert(`${cart.quantity} quantity of ${this.product.name} added to cart`);
  }

  // cartQty(qty: number): void{
  //   this.cartQ = qty;
  //   this.currenCartQty.emit(qty);
  // }

}
