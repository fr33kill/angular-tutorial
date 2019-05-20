import {
  Component,
  OnInit
} from "@angular/core";
import {
  IProduct
} from "./products";
import {
  ProductService
} from "./product.service";

@Component( {
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.css' ]
} )

export class ProductListComponent implements OnInit {



  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter( value: string ) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter( this.listFilter ) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];
  errorMessage: string;

  constructor( private productService: ProductService ) {

  }

  ngOnInit(): void {
    console.log( 'ngOnInit' );
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any> error
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter( filterby: string ): IProduct[] {
    filterby = filterby.toLocaleLowerCase();
    return this.products.filter( ( product: IProduct ) =>
      product.productName.toLocaleLowerCase().indexOf( filterby ) !== -1 );
  }

  ratingClicked( message: string ): void {
    this.pageTitle = 'Product List: ' + message;
  }
}