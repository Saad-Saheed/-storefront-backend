import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../models/cart';
// import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterContentChecked {
public isCollapsed = true;
cartQ: number = 0;

constructor(private cartService: CartService){

}

ngAfterContentChecked():void{
  let newCarts: Cart[] = [];
  this.cartService.currentCarts.subscribe((carts =>{
      newCarts = carts;
  }));

  let cartQuantity: number = 0;

  newCarts.forEach((cart, index, all) => {
    cartQuantity += cart.quantity;
  });

  this.cartQ = cartQuantity;
}

}
