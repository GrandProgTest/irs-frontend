// src/app/vendors/components/vendor-form-dialog/vendor-form-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendor } from '../../model/vendor.entity';

@Component({
  selector: 'app-vendor-form-dialog',
  templateUrl: './vendor-form-dialog.component.html',
  styleUrls: ['./vendor-form-dialog.component.css']
})
export class VendorFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VendorFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor, editMode: boolean }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.data.vendor);
  }
}
