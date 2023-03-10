import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import  * as Sicon  from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css', '../product-item/product-item.component.css']
})
export class ProductItemDetailComponent implements OnInit  {
  product: Product;
  Sicon = Sicon;
  pid: number = 0;

  constructor(private route: ActivatedRoute, private httpService: HttpService){
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
    // get route param
    this.route.params.subscribe(params => {
      if(params['id'])
        this.pid = parseInt(params['id'] as string);
    });

    // get all products
    this.product = await this.httpService.getProduct(this.pid);
  }

}
