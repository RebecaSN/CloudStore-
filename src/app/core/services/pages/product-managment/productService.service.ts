import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://rest-items.research.cloudonix.io/items';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<any> {
    const authKey = this.authService.getAuthKey();
    if (!authKey) {
      throw new Error('No authorization key found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authKey}`,
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  createProduct(product: any): Observable<any> {
    const authKey = this.authService.getAuthKey();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authKey}`);

    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  editProduct(productId: number, updatedProduct: any): Observable<any> {
    const authKey = this.authService.getAuthKey();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authKey}`);
    const url = `${this.apiUrl}/${productId}`;

    return this.http.patch<any>(url, updatedProduct, { headers });
  }

  deleteProduct(productId: number): Observable<void> {
    const authKey = this.authService.getAuthKey();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authKey}`);
    const url = `${this.apiUrl}/${productId}`;

    return this.http.delete<void>(url, { headers });
  }
}
