import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFlightComponent } from './hotel-flight.component';

describe('HotelFlightComponent', () => {
  let component: HotelFlightComponent;
  let fixture: ComponentFixture<HotelFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
