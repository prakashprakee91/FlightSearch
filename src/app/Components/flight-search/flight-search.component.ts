import { Component, OnInit } from '@angular/core';
import { FlightdataService } from 'src/flightdata.service'

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  public bTwoWayTrip: boolean;
  public sSource: string;
  public sDestination: string;
  public minDate;
  private sAvailableSourceArr: Array<string>;
  private sAvailableDestinationArr: Array<string>;
  public oTypedSourceData: Array<any>;
  public oSelectedSource: string;
  public oTypedDestinationData: Array<any>;
  public oSelectedDestination: string;

  constructor(private flightService: FlightdataService) { }

  public ngOnInit(): void {
    this.bTwoWayTrip = false;
    this.fnFillAvailableAirports();
    this.sSource = '';
    this.oTypedSourceData = [];
    this.oSelectedSource = '';
    this.sDestination = '';
    this.oTypedDestinationData = [];
    this.oSelectedDestination = '';
    this.fnGetDate();
  };

  private fnFillAvailableAirports(): void {
    this.sAvailableSourceArr = [];
    this.sAvailableDestinationArr = [];
    const jsonData = this.flightService.flightData.Data;
    jsonData.forEach(element => {
      let sNameCode: string = '';
      sNameCode = element.Source + ' - ' + element.SourceCode;
      if (false === this.sAvailableSourceArr.includes(sNameCode))
        this.sAvailableSourceArr.push(sNameCode);
      sNameCode = element.Destination + ' - ' + element.DestinationCode;
      if (false === this.sAvailableDestinationArr.includes(sNameCode))
        this.sAvailableDestinationArr.push(sNameCode);
    });
  }
  public fnSearchSource(): void {
    this.oTypedSourceData = [];
    this.oSelectedSource = null; // To show no results found in case of selecting and modifying name
    if (this.sSource === '')
      return; // Clear array of results i.e dont display anything

    this.sAvailableSourceArr.forEach(item => {
      if (item.toLocaleLowerCase().includes(this.sSource.toLocaleLowerCase()))
        this.oTypedSourceData.push(item);
    })
  }

  public fnSearchDestination(): void {
    this.oTypedDestinationData = [];
    this.oSelectedDestination = null; // To show no results found in case of selecting and modifying name
    if (this.sDestination === '')
      return; // Clear array of results i.e dont display anything

    this.sAvailableDestinationArr.forEach(item => {
      if (item.toLocaleLowerCase().includes(this.sDestination.toLocaleLowerCase()))
        this.oTypedDestinationData.push(item);
    })

    this.sAvailableDestinationArr.reduce((a,e,i)=>
    (e === '')? a.concat[i] : a, []
  )
  }

  private fnGetDate(): void {
    this.minDate = this.flightService.getCurrentDate();
  }

  public fnSourceDataClick(oSelectedSource): void {
    this.sSource = oSelectedSource;
    this.oTypedSourceData = [];
    this.oSelectedSource = oSelectedSource;
  }

  public fnDestinationDataClick(oSelectedDestination): void {
    this.sDestination = oSelectedDestination;
    this.oTypedDestinationData = [];
    this.oSelectedDestination = oSelectedDestination;
  }

  public fnSearchFlightBtnClick(): void {
    const sSourceCode: string = this.oSelectedSource.substring(this.oSelectedSource.lastIndexOf('-') + 2,this.oSelectedSource.length);
    const sDestinationCode: string = this.oSelectedDestination.substring(this.oSelectedDestination.lastIndexOf('-') + 2,this.oSelectedDestination.length);
    const sSourceName: string = this.oSelectedSource.substring(0, this.oSelectedSource.lastIndexOf('-'));
    const sDestinationName: string = this.oSelectedDestination.substring(0, this.oSelectedDestination.lastIndexOf('-'));
    const sSearchObj: any = {
      "sourceCode": sSourceCode,
      "sourceName":sSourceName,
      "destinationCode": sDestinationCode,
      "destinationName":sDestinationName,
      "bTwoWay":this.bTwoWayTrip
    };

    this.flightService.searchFlights(sSearchObj);
  }
}
