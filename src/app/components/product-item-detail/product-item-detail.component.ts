import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  * as Sicon  from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css', '../product-item/product-item.component.css']
})
export class ProductItemDetailComponent implements OnInit  {
  base_url = '';
  product: Product;
  Sicon = Sicon;
  pid: number = 0;

  constructor(private app: AppComponent, private route: ActivatedRoute, private httpService: HttpService,  private cartService: CartService){
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      category: '',
      description: ''
    };
  }

  async ngOnInit(): Promise<void> {
    this.base_url = this.app.base_url;

    // get route param
    this.route.params.subscribe(params => {
      if(params['id'])
        this.pid = parseInt(params['id'] as string);
    });

    // get all products
    this.product = await this.httpService.getProduct(this.pid);
  }

  productToCart(cart: Cart){
    this.cartService.addToCart(cart);
    alert(`${cart.quantity} quantity of ${this.product.name} added to cart`);
  }

}
