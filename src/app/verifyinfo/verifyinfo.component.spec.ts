import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyinfoComponent } from './verifyinfo.component';

describe('VerifyinfoComponent', () => {
  let component: VerifyinfoComponent;
  let fixture: ComponentFixture<VerifyinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
