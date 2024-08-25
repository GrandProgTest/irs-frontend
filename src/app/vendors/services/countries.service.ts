import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Service to handle country-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  /**
   * API URL for country-related endpoints.
   */
  private apiUrl = `${environment.serverBasePath}/country`;

  /**
   * Constructor to inject HttpClient.
   * @param http - HttpClient instance to make HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of countries from the server.
   * @returns An Observable of string array containing country names.
   */
  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
