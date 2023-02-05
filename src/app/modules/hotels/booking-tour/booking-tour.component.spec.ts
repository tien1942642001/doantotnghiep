import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTourComponent } from './booking-tour.component';

describe('BookingTourComponent', () => {
  let component: BookingTourComponent;
  let fixture: ComponentFixture<BookingTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
