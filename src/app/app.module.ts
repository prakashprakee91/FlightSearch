import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchComponent } from './Components/flight-search/flight-search.component';
import { FlightResultsComponent } from './Components/flight-results/flight-results.component';
import { FlightDataComponent } from './components/flight-data/flight-data.component';
import { FlightItemComponent } from './components/flight-item/flight-item.component';
import { FlightTwowayItemComponent } from './components/flight-twoway-item/flight-twoway-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    FlightResultsComponent,
    FlightDataComponent,
    FlightItemComponent,
    FlightTwowayItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
