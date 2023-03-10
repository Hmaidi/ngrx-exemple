/**
 * @author : Mohamed YOUSSFI, med@youssfi.net,
 * ENSET Mohammedia, Université Hassan II de Casablanca
 *
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../model/product.model';

@Injectable({providedIn:"root"})
export class ProductService {
  products = [{
    id: 5,
    name: 'prod1',
    price: 6,
    quantity: 3,
    selected: true,
    available: true,
  },
  {
    id: 9,
    name: 'prod2',
    price: 5,
    quantity: 3,
    selected: true,
    available: true,
  },
  {
    id: 6,
    name: 'prod3',
    price: 2.33,
    quantity: 8,
    selected: false,
    available: true,
  }]
  constructor(private http:HttpClient) {
  }

  public getProducts():Observable<Product[]>{
    let host=Math.random()>0.2?environment.host:environment.unreachableHost;
    //let host=environment.host;
    //return this.http.get<Product[]>(host+"/products");
    //return throwError("Not Implemented yet");
    return of(this.products)
  }
  public getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?selected=true");
//    return of(this.products.filter(p => !!p.selected))
  }
  public getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?available=true");
  }

  public searchProducts(name:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?name_like="+name);
  }
  public setSelected(product:Product):Observable<Product>{
    return this.http.put<Product>(environment.host+"/products/"+product.id,{...product,selected:!product.selected});
  }
  public delete(id:number):Observable<void>{
     return this.http.delete<void>(environment.host+"/products/"+id);
  }
  public save(product:Product):Observable<Product>{
    return this.http.post<Product>(environment.host+"/products/",product);
  }
  public update(product:Product):Observable<Product>{
    return this.http.put<Product>(environment.host+"/products/"+product.id,product);
  }
  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(environment.host+"/products/"+id);
  }

}
