import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { VendorCreateEditDeleteComponent } from './vendors/components/vendor-create-edit-delete/vendor-create-edit-delete.component';
import { VendorManagementComponent } from './vendors/pages/vendor-management/vendor-management.component';
import { VendorFormDialogComponent } from './vendors/components/vendor-form-dialog/vendor-form-dialog.component';
import {
  ConfirmDeleteDialog} from './vendors/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ScrapperDialogComponent } from './vendors/components/scrapper-dialog/scrapper-dialog.component';
import { EditVendorDialogComponent } from './vendors/components/edit-vendor-dialog/edit-vendor-dialog.component';
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatSelectModule } from '@angular/material/select';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';
import { AuthenticationSectionComponent } from './iam/components/authentication-section/authentication-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    VendorCreateEditDeleteComponent,
    VendorManagementComponent,
    VendorFormDialogComponent,
    ConfirmDeleteDialog,
    ScrapperDialogComponent,
    EditVendorDialogComponent,
    SignInComponent,
    AuthenticationSectionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
