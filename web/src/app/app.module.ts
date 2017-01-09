import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FloatingNavBtnComponent } from './floating-nav-btn/floating-nav-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    FloatingNavBtnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent, FloatingNavBtnComponent]
})
export class AppModule { }
