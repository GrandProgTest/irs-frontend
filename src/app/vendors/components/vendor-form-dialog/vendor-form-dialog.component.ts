// src/app/vendors/components/vendor-form-dialog/vendor-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendor } from '../../model/vendor.entity';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-vendor-form-dialog',
  templateUrl: './vendor-form-dialog.component.html',
  styleUrls: ['./vendor-form-dialog.component.css']
})
export class VendorFormDialogComponent implements OnInit {
  countries: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<VendorFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor, editMode: boolean },
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countriesService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.data.vendor);
  }
}
