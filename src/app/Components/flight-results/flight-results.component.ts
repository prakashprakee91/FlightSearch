import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlightdataService } from 'src/flightdata.service';

export enum SearchResultsState {
  Loading = 0,
  NoResult = 1,
  ValidResult = 2,
  InitialView = 3
}

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.scss']
})
export class FlightResultsComponent implements OnInit, OnDestroy {

  public SearchResultsState: any;
  public eSearchResultsState: SearchResultsState;
  private oFlightDataSubscribe: Subscription;

  public sSourceTitle: string;
  public sDestinationTitle: string;

  public onwardFlightArr: Array<any>;
  public returnFlightArr: Array<any>;
  constructor(private flightService: FlightdataService) { }

  ngOnInit() {
    this.SearchResultsState = SearchResultsState;
    this.onwardFlightArr = [];
    this.returnFlightArr = [];

    this.oFlightDataSubscribe = this.flightService.oSearchResult$.subscribe((flightToSearch: any): void => {
      this.fnUpdateSearchResults(flightToSearch);
    });
    this.eSearchResultsState = SearchResultsState.InitialView;

  }

  ngOnDestroy(): void {
    this.oFlightDataSubscribe.unsubscribe();
  }
  private fnUpdateSearchResults(flightToSearch): void {
    this.onwardFlightArr = [];
    this.returnFlightArr = [];
    this.eSearchResultsState = SearchResultsState.Loading;
    this.sSourceTitle = flightToSearch.sourceName + '( ' + flightToSearch.sourceCode + ' )';
    this.sDestinationTitle = flightToSearch.destinationName + '( ' + flightToSearch.destinationCode + ' )';
    this.fnGetFlights(flightToSearch);

  }

  private fnGetFlights(flightToSearch): void {
    const jsonData = this.flightService.flightData.Data;
    jsonData.forEach(element => {
      if (element.SourceCode === flightToSearch.sourceCode && element.DestinationCode === flightToSearch.destinationCode)
        this.onwardFlightArr.push(element);

      //To update return flight
      if (flightToSearch.bTwoWay === true && element.SourceCode === flightToSearch.destinationCode && element.DestinationCode === flightToSearch.sourceCode)
        this.returnFlightArr.push(element);
    });

    if (this.onwardFlightArr.length === 0 && this.returnFlightArr.length === 0)
      this.eSearchResultsState = SearchResultsState.NoResult;
    else
      this.eSearchResultsState = SearchResultsState.ValidResult;
  }
}
