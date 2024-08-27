import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ScrapperService } from '../../services/scrapper.service';
import { ResultsDialogComponent } from '../results-dialog/results-dialog.component';

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
    private scrapperService: ScrapperService,
    private dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSearch(): void {
    const firmName = this.data.element.businessName || this.data.element.tradeName;

    if (this.worldBankChecked) {
      this.scrapperService.getFirmDataBank(firmName).subscribe(response => {
        this.worldBankResults = response.results;
        this.openResultsDialog('World Bank Results', this.worldBankResults, 'worldBank');
      });
    }

    if (this.ofacChecked) {
      this.scrapperService.getFirmDataOfac(firmName).subscribe(response => {
        this.ofacResults = response.results;
        this.openResultsDialog('OFAC Results', this.ofacResults, 'ofac');
      });
    }

    if (this.worldBankMoreOpenChecked) {
      this.scrapperService.getFirmDataBankMoreOpen(firmName).subscribe(response => {
        this.worldBankMoreOpenResults = response.results;
        this.openResultsDialog('World Bank More Open Results', this.worldBankMoreOpenResults, 'worldBank');
      });
    }

    if (this.ofacMoreOpenChecked) {
      this.scrapperService.getFirmDataOfacMoreOpen(firmName).subscribe(response => {
        this.ofacMoreOpenResults = response.results;
        this.openResultsDialog('OFAC More Open Results', this.ofacMoreOpenResults, 'ofac');
      });
    }
  }

  isSearchEnabled(): boolean {
    return this.worldBankChecked || this.ofacChecked || this.worldBankMoreOpenChecked || this.ofacMoreOpenChecked;
  }

  openResultsDialog(title: string, results: any[], type: string): void {
    this.dialog.open(ResultsDialogComponent, {
      width: 'auto',
      data: { title, results, type }
    });
  }
}
