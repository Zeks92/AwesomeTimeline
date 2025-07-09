import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxTimelineModule } from 'ngx-timeline';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTimelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
