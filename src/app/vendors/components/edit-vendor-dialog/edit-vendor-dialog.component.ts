// src/app/vendors/components/edit-vendor-dialog/edit-vendor-dialog.component.ts
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vendor } from '../../model/vendor.entity';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-edit-vendor-dialog',
  templateUrl: './edit-vendor-dialog.component.html',
  styleUrls: ['./edit-vendor-dialog.component.css']
})
export class EditVendorDialogComponent implements OnInit {
  private originalVendor: Vendor;
  @Output() cancelEdit = new EventEmitter<void>();
  countries: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditVendorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor },
    private countriesService: CountriesService
  ) {
    this.originalVendor = { ...data.vendor };
  }

  ngOnInit(): void {
    this.originalVendor = { ...this.data.vendor };
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countriesService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  onCancel(): void {
    this.data.vendor = { ...this.originalVendor };
    this.cancelEdit.emit();
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.data.vendor);
  }
}
