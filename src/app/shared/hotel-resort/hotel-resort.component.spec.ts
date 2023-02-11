import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelResortComponent } from './hotel-resort.component';

describe('HotelResortComponent', () => {
  let component: HotelResortComponent;
  let fixture: ComponentFixture<HotelResortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelResortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelResortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
