import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInfoAdminComponent } from './option-info-admin.component';

describe('OptionInfoAdminComponent', () => {
  let component: OptionInfoAdminComponent;
  let fixture: ComponentFixture<OptionInfoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionInfoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionInfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
