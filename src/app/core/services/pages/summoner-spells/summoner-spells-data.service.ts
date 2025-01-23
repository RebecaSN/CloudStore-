import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummonerSpell } from 'src/app/core/models/pages/summoner-spells/summonerSpell';

const summonersData = require('src/assets/json/summoner_spell_info.json');

@Injectable({
  providedIn: 'root'
})
export class SummonerSpellsDataService {

  private baseUrl = 'http://rest-items.research.cloudonix.io/items';

  constructor(private http: HttpClient) {}

  getProducts(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<any>(this.baseUrl, { headers });
  }
}
