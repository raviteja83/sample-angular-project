import { BrowserModule } from '@angular/platform-browser';
import AngularTree from 'angular-tree-component';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularTree],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
