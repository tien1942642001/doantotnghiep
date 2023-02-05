import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamHoiAnComponent } from './nam-hoi-an.component';

describe('NamHoiAnComponent', () => {
  let component: NamHoiAnComponent;
  let fixture: ComponentFixture<NamHoiAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamHoiAnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamHoiAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
