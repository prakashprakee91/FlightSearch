import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightdataService {

  private oSearchResultSub = new BehaviorSubject<any>('');
  public oSearchResult$ = this.oSearchResultSub.asObservable();
  public flightData = require('src/app/Components/flight-search/flight-search.json');

  constructor() { }

  public getCurrentDate(){
    let today = new Date();
	  let dd: any = today.getDate();
	  let mm: any = today.getMonth()+1;
	  let yy = today.getFullYear();
	  if (dd<10) {
		  dd = '0' + dd;
	  }
	  if (mm<10) {
		  mm = '0' + mm;
    }
    return yy + '-' + mm + '-' + dd;
  }

  public searchFlights(searchData): void {
    this.oSearchResultSub.next(searchData);
  }
}
