import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFormDialogComponent } from './vendor-form-dialog.component';

describe('VendorFormDialogComponent', () => {
  let component: VendorFormDialogComponent;
  let fixture: ComponentFixture<VendorFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
