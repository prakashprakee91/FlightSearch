import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-data',
  templateUrl: './flight-data.component.html',
  styleUrls: ['./flight-data.component.scss']
})
export class FlightDataComponent implements OnInit {

  @Input() public oFlight: any;
  constructor() { }

  ngOnInit() {
  }

}
