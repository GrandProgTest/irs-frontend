import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrapperService } from '../../services/scrapper.service';

@Component({
  selector: 'app-scrapper-dialog',
  templateUrl: './scrapper-dialog.component.html',
  styleUrls: ['./scrapper-dialog.component.css']
})
export class ScrapperDialogComponent {
  worldBankChecked = false;
  ofacChecked = false;
  worldBankResults: any[] = [];
  ofacResults: any[] = [];

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
      });
    }

    if (this.ofacChecked) {
      this.scrapperService.getFirmDataOfac(firmName).subscribe(response => {
        this.ofacResults = response.results;
      });
    }
  }
}
