import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrapperService } from '../../services/scrapper.service';
import * as XLSX from 'xlsx';

/**
 * Component for the scrapper dialog.
 * Handles the display and search functionality for World Bank and OFAC data.
 */
@Component({
  selector: 'app-scrapper-dialog',
  templateUrl: './scrapper-dialog.component.html',
  styleUrls: ['./scrapper-dialog.component.css']
})
export class ScrapperDialogComponent {
  worldBankChecked = false;
  ofacChecked = false;
  worldBankMoreOpenChecked = false;
  ofacMoreOpenChecked = false;

  worldBankResults: any[] = [];
  ofacResults: any[] = [];
  worldBankMoreOpenResults: any[] = [];
  ofacMoreOpenResults: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ScrapperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scrapperService: ScrapperService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSearch(): void {
    const firmName = this.data.element.businessName || this.data.element.tradeName;

    if (this.worldBankChecked) {
      this.scrapperService.getFirmDataBank(firmName).subscribe(response => {
        this.worldBankResults = response.results;
        if (this.worldBankResults.length > 5) {
          this.downloadExcel(this.worldBankResults, 'WorldBankResults');
        }
      });
    }

    if (this.ofacChecked) {
      this.scrapperService.getFirmDataOfac(firmName).subscribe(response => {
        this.ofacResults = response.results;
        if (this.ofacResults.length > 5) {
          this.downloadExcel(this.ofacResults, 'OFACResults');
        }
      });
    }

    if (this.worldBankMoreOpenChecked) {
      this.scrapperService.getFirmDataBankMoreOpen(firmName).subscribe(response => {
        this.worldBankMoreOpenResults = response.results;
        if (this.worldBankMoreOpenResults.length > 5) {
          this.downloadExcel(this.worldBankMoreOpenResults, 'WorldBankMoreOpenResults');
        }
      });
    }

    if (this.ofacMoreOpenChecked) {
      this.scrapperService.getFirmDataOfacMoreOpen(firmName).subscribe(response => {
        this.ofacMoreOpenResults = response.results;
        if (this.ofacMoreOpenResults.length > 5) {
          this.downloadExcel(this.ofacMoreOpenResults, 'OFACMoreOpenResults');
        }
      });
    }
  }

  isSearchEnabled(): boolean {
    return this.worldBankChecked || this.ofacChecked || this.worldBankMoreOpenChecked || this.ofacMoreOpenChecked;
  }

  downloadExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
