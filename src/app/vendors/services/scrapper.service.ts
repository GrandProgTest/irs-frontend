import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrapperService {

  private apiUrlBank = 'http://127.0.0.1:5000/search';
  private apiUrlOfac = 'http://127.0.0.1:5000/search_ofac';

  constructor(private http: HttpClient) { }

  getFirmDataBank(firmName: string): Observable<any> {
    const params = { firm_name: firmName };
    return this.http.get<any>(this.apiUrlBank, { params });
  }

  getFirmDataOfac(firmName: string): Observable<any> {
    const params = { firm_name: firmName };
    return this.http.get<any>(this.apiUrlOfac, { params });
  }
}
