import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-twoway-item',
  templateUrl: './flight-twoway-item.component.html',
  styleUrls: ['./flight-twoway-item.component.scss']
})
export class FlightTwowayItemComponent implements OnInit {

  @Input() public onwardFlightArr: Array<any>;

  @Input() public returnFlightArr: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
