import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent implements OnInit {

  @Input() public flightArr: Array<any>;
  
  constructor() { }

  ngOnInit() {
  }

}
