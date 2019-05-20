import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: String = 'Product Detail';
  product : IProduct;
  errorMessage: string;
  
  constructor( private route: ActivatedRoute,
               private router: Router,
               private productService: ProductService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    // + is a shortcut to convert a string into a numeric ID.

    this.pageTitle += ` : ${id}`;
    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product;
      },
      error => this.errorMessage = <any> error
    );
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
