// src/app/vendors/components/vendor-create-edit-delete/vendor-create-edit-delete.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vendor } from '../../model/vendor.entity';
import { VendorFormDialogComponent } from '../vendor-form-dialog/vendor-form-dialog.component';

@Component({
  selector: 'app-vendor-create-edit-delete',
  templateUrl: './vendor-create-edit-delete.component.html',
  styleUrls: ['./vendor-create-edit-delete.component.css']
})
export class VendorCreateEditDeleteComponent {
  @Input() vendor: Vendor = {} as Vendor;
  @Input() editMode = false;
  @Output() vendorUpdated = new EventEmitter<Vendor>();
  @Output() vendorAdded = new EventEmitter<Vendor>();
  @Output() editCanceled = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  openDialog(editMode: boolean, vendor: Vendor = {} as Vendor): void {
    const dialogRef = this.dialog.open(VendorFormDialogComponent, {
      width: '400px',
      data: { vendor, editMode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editMode) {
          this.vendorUpdated.emit(result);
        } else {
          this.vendorAdded.emit(result);
        }
      } else {
        this.editCanceled.emit();
      }
    });
  }
}
