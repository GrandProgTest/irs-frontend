// src/app/vendors/components/vendor-create-edit-delete/vendor-create-edit-delete.component.ts
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Vendor } from '../../model/vendor.entity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendor-create-edit-delete',
  templateUrl: './vendor-create-edit-delete.component.html',
  styleUrl: './vendor-create-edit-delete.component.css'
})
export class VendorCreateEditDeleteComponent {

  // Attributes
  @Input() vendor: Vendor;
  @Input() editMode = false;
  @Output() vendorAdded = new EventEmitter<Vendor>();
  @Output() vendorUpdated = new EventEmitter<Vendor>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('vendorForm', { static: false }) vendorForm!: NgForm;

  // Methods
  constructor() {
    this.vendor = {} as Vendor;
  }

  onSubmit() {
    if (this.vendorForm.form.valid) {
      let emitter = this.editMode ? this.vendorUpdated : this.vendorAdded;
      emitter.emit(this.vendor);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  // Event Handlers
  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }

  // Private methods
  private resetEditState() {
    this.vendor = {} as Vendor;
    this.editMode = false;
    this.vendorForm.resetForm();
  }
}
