// src/app/vendors/model/vendor.entity.ts
export class Vendor {
  id: number;
  businessName: string;
  tradeName: string;
  taxId: string;
  phoneNumber: string;
  email: string;
  website: string;
  address: string;
  country: string;
  annualBilling: number;
  updatedDate: string;

  constructor() {
    this.id = 0;
    this.businessName = "";
    this.tradeName = "";
    this.taxId = "";
    this.phoneNumber = "";
    this.email = "";
    this.website = "";
    this.address = "";
    this.country = "";
    this.annualBilling = 0.0;
    this.updatedDate = "";
  }
}
