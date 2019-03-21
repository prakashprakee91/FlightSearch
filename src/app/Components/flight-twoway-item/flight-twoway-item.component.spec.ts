import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTwowayItemComponent } from './flight-twoway-item.component';

describe('FlightTwowayItemComponent', () => {
  let component: FlightTwowayItemComponent;
  let fixture: ComponentFixture<FlightTwowayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightTwowayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTwowayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
