import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vendor } from '../../model/vendor.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendorsService } from '../../services/vendors.service';
import { ConfirmDeleteDialog } from '../../components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ScrapperDialogComponent } from '../../components/scrapper-dialog/scrapper-dialog.component';
import { EditVendorDialogComponent } from '../../components/edit-vendor-dialog/edit-vendor-dialog.component';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent implements OnInit, AfterViewInit {

  vendorData: Vendor;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['businessName', 'tradeName', 'taxId', 'phoneNumber', 'email', 'website', 'address', 'country', 'annualBilling', 'updatedDate', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isEditMode: boolean;

  constructor(private dialog: MatDialog,
              private vendorService: VendorsService) {
    this.isEditMode = false;
    this.vendorData = {} as Vendor;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.vendorData = {} as Vendor;
  }

  confirmDelete(element: Vendor): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '800px',
      data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteItem(element);
      }
    });
  }

  onScreening(element: Vendor): void {
    this.dialog.open(ScrapperDialogComponent, {
      width: '800px',
      data: { element }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `Fecha: ${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} // Hora: ${date.toTimeString().split(' ')[0]}`;
  }

  onEditItem(element: Vendor) {
    this.isEditMode = true;
    this.vendorData = element;
    const dialogRef = this.dialog.open(EditVendorDialogComponent, {
      width: '500px',
      data: { vendor: element }
    });

    dialogRef.componentInstance.cancelEdit.subscribe(() => {
      this.onCancelEdit();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onVendorUpdated(result);
      }
    });
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
  }

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
  }

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
  }


  ngOnInit(): void {
    this.getAllVendors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'updatedDate': return new Date(item.updatedDate);
        default: return item[property];
      }
    };
    this.dataSource.sort.active = 'updatedDate';
    this.dataSource.sort.direction = 'desc';
  }
}
