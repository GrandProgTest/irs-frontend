import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Vendor } from '../model/vendor.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorsService extends BaseService<Vendor> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/vendors';
  }
}
