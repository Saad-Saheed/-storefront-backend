import { Component, OnInit } from '@angular/core';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  checkoutData: Checkout;
  constructor(private cartSrvice: CartService){
    this.checkoutData = {
      fullname: '',
      address: '',
      creditcard: 0,
      totalPrice: 0
    }
  }

  ngOnInit(){
      this.cartSrvice.getCheckoutFormData().subscribe((data)=>{
        this.checkoutData = data;
      });
  }

}
