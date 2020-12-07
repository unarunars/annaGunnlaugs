import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { PaintingsComponent } from './paintings/paintings.component';
import { DesignComponent } from './design/design.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { AdminComponent } from './admin/admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ChangePaintingsComponent } from './change-paintings/change-paintings.component';
import { ChangeCVComponent } from './change-cv/change-cv.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ChangeCoverComponent } from './change-cover/change-cover.component';
import { ChangeShowCoverComponent } from './change-show-cover/change-show-cover.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PaintingsComponent,
    DesignComponent,
    AdminComponent,
    ChangePaintingsComponent,
    ChangeCVComponent,
    ChangeCoverComponent,
    ChangeShowCoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    HttpClientModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
