import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Vendor } from '../model/vendor.entity';
import { HttpClient } from '@angular/common/http';

/**
 * Service to handle vendor-related operations.
 * Extends the BaseService to inherit common CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class VendorsService extends BaseService<Vendor> {

  /**
   * Constructor to inject HttpClient and initialize the resource endpoint.
   * @param http - HttpClient instance to make HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/vendors';
  }
}
