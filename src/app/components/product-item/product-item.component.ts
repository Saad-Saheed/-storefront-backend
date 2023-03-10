import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import  * as Sicon  from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  Sicon = Sicon;
  // cartQ: number = 0;
  // @Output() currenCartQty: EventEmitter<number> = new EventEmitter();

  constructor() {
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

  }

  // cartQty(qty: number): void{
  //   this.cartQ = qty;
  //   this.currenCartQty.emit(qty);
  // }

}
