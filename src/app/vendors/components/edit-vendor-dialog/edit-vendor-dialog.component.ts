import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vendor } from '../../model/vendor.entity';

@Component({
  selector: 'app-edit-vendor-dialog',
  templateUrl: './edit-vendor-dialog.component.html',
  styleUrls: ['./edit-vendor-dialog.component.css']
})
export class EditVendorDialogComponent implements OnInit {
  private originalVendor: Vendor;
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<EditVendorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor }
  ) {
    this.originalVendor = { ...data.vendor };
  }

  ngOnInit(): void {
    this.originalVendor = { ...this.data.vendor };
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
