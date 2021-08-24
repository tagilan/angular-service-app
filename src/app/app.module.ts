import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ServiceStatusComponent } from './service-status/service-status.component';
@NgModule({
  declarations: [
    AppComponent,
    ServiceStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
