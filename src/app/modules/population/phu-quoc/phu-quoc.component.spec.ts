import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuQuocComponent } from './phu-quoc.component';

describe('PhuQuocComponent', () => {
  let component: PhuQuocComponent;
  let fixture: ComponentFixture<PhuQuocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhuQuocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhuQuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
