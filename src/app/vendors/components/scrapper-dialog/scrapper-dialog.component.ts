import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrapperService } from '../../services/scrapper.service';

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
  /**
   * Indicates if the World Bank checkbox is checked.
   */
  worldBankChecked = false;

  /**
   * Indicates if the OFAC checkbox is checked.
   */
  ofacChecked = false;

  /**
   * Indicates if the World Bank (more open) checkbox is checked.
   */
  worldBankMoreOpenChecked = false;

  /**
   * Indicates if the OFAC (more open) checkbox is checked.
   */
  ofacMoreOpenChecked = false;

  /**
   * Stores the results from the World Bank search.
   */
  worldBankResults: any[] = [];

  /**
   * Stores the results from the OFAC search.
   */
  ofacResults: any[] = [];

  /**
   * Stores the results from the World Bank (more open) search.
   */
  worldBankMoreOpenResults: any[] = [];

  /**
   * Stores the results from the OFAC (more open) search.
   */
  ofacMoreOpenResults: any[] = [];

  /**
   * Constructor to inject dependencies.
   * @param dialogRef - Reference to the dialog opened.
   * @param data - Data passed to the dialog.
   * @param scrapperService - Service to handle scrapping operations.
   */
  constructor(
    public dialogRef: MatDialogRef<ScrapperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scrapperService: ScrapperService
  ) {}

  /**
   * Closes the dialog without performing any action.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Performs the search operation based on the selected checkboxes.
   * Fetches data from World Bank and/or OFAC based on the firm name.
   */
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

    if (this.worldBankMoreOpenChecked) {
      this.scrapperService.getFirmDataBankMoreOpen(firmName).subscribe(response => {
        this.worldBankMoreOpenResults = response.results;
      });
    }

    if (this.ofacMoreOpenChecked) {
      this.scrapperService.getFirmDataOfacMoreOpen(firmName).subscribe(response => {
        this.ofacMoreOpenResults = response.results;
      });
    }
  }

  /**
   * Checks if at least one checkbox is selected.
   * @returns True if at least one checkbox is selected, otherwise false.
   */
  isSearchEnabled(): boolean {
    return this.worldBankChecked || this.ofacChecked || this.worldBankMoreOpenChecked || this.ofacMoreOpenChecked;
  }
}
