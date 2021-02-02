import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtRegisterComponent } from './debt-register.component';

describe('UserProfileComponent', () => {
  let component: DebtRegisterComponent;
  let fixture: ComponentFixture<DebtRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
