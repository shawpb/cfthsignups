import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyinfoComponent } from './agencyinfo.component';

describe('AgencyinfoComponent', () => {
  let component: AgencyinfoComponent;
  let fixture: ComponentFixture<AgencyinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
