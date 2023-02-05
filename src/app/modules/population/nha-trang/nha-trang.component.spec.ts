import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaTrangComponent } from './nha-trang.component';

describe('NhaTrangComponent', () => {
  let component: NhaTrangComponent;
  let fixture: ComponentFixture<NhaTrangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhaTrangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhaTrangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
