import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vendor } from '../../model/vendor.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendorsService } from '../../services/vendors.service';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrl: './vendor-management.component.css'
})
export class VendorManagementComponent implements OnInit, AfterViewInit {

  // Attributes

  vendorData: Vendor;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'businessName', 'tradeName', 'taxId', 'phoneNumber', 'email', 'website', 'address', 'country', 'annualBilling', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isEditMode: boolean;

  // Constructor

  constructor(private vendorService: VendorsService) {
    this.isEditMode = false;
    this.vendorData = {} as Vendor;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods

  private resetEditState(): void {
    this.isEditMode = false;
    this.vendorData = {} as Vendor;
  }

  // UI Event Handlers

  onEditItem(element: Vendor) {
    this.isEditMode = true;
    this.vendorData = element;
  }

  onDeleteItem(element: Vendor) {
    this.deleteVendor(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllVendors();
  }

  onVendorAdded(element: Vendor) {
    this.vendorData = element;
    this.createVendor();
    this.resetEditState();
  }

  onVendorUpdated(element: Vendor) {
    this.vendorData = element;
    this.updateVendor();
    this.resetEditState();
  }

  // CRUD Actions

  private getAllVendors() {
    this.vendorService.getAll().subscribe(
      (response: any) => {
        console.log('getAllVendors response:', response);
        this.dataSource.data = response;
      },
      (error: any) => {
        console.error('getAllVendors error:', error);
      }
    );
  }

  private createVendor() {
    this.vendorService.create(this.vendorData).subscribe(
      (response: any) => {
        console.log('createVendor response:', response);
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data.map((vendor: Vendor) => {
          return vendor;
        });
      },
      (error: any) => {
        console.error('createVendor error:', error);
      }
    );
  };

  private updateVendor() {
    let vendorToUpdate = this.vendorData;
    this.vendorService.update(this.vendorData.id, vendorToUpdate).subscribe(
      (response: any) => {
        console.log('updateVendor response:', response);
        this.dataSource.data = this.dataSource.data.map((vendor: Vendor) => {
          if (vendor.id === response.id) {
            return response;
          }
          return vendor;
        });
      },
      (error: any) => {
        console.error('updateVendor error:', error);
      }
    );
  };

  private deleteVendor(vendorId: number) {
    this.vendorService.delete(vendorId).subscribe(
      () => {
        console.log('deleteVendor success');
        this.dataSource.data = this.dataSource.data.filter((vendor: Vendor) => {
          return vendor.id !== vendorId ? vendor : false;
        });
      },
      (error: any) => {
        console.error('deleteVendor error:', error);
      }
    );
  };

  // Angular Lifecycle Hooks

  ngOnInit(): void {
    this.getAllVendors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
