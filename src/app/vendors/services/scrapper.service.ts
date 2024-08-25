import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service to handle data scraping operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ScrapperService {

  /**
   * API URL for bank data scraping.
   */
  private apiUrlBank = 'http://127.0.0.1:5000/search';

  /**
   * API URL for OFAC data scraping.
   */
  private apiUrlOfac = 'http://127.0.0.1:5000/search_ofac';

  /**
   * Constructor to inject HttpClient.
   * @param http - HttpClient instance to make HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches firm data from the bank data scraping API.
   * @param firmName - The name of the firm to search for.
   * @returns An Observable containing the firm data.
   */
  getFirmDataBank(firmName: string): Observable<any> {
    const params = { firm_name: firmName };
    return this.http.get<any>(this.apiUrlBank, { params });
  }

  /**
   * Fetches firm data from the OFAC data scraping API.
   * @param firmName - The name of the firm to search for.
   * @returns An Observable containing the firm data.
   */
  getFirmDataOfac(firmName: string): Observable<any> {
    const params = { firm_name: firmName };
    return this.http.get<any>(this.apiUrlOfac, { params });
  }
}
