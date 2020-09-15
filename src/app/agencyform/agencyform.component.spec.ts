import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyformComponent } from './agencyform.component';

describe('AgencyformComponent', () => {
  let component: AgencyformComponent;
  let fixture: ComponentFixture<AgencyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
