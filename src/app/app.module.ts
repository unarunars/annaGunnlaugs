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


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PaintingsComponent,
    DesignComponent,
    AdminComponent,
    ChangePaintingsComponent,
    ChangeCVComponent,
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
    MatProgressBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
