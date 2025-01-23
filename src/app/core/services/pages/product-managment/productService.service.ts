import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

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


  // getProducts(authToken: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${authToken}`
  //   });

  //   return this.http.get<any>(this.baseUrl, { headers });
  // }
}
