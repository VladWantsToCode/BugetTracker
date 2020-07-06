import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetHomeComponent } from './budget-home.component';

describe('BudgetHomeComponent', () => {
  let component: BudgetHomeComponent;
  let fixture: ComponentFixture<BudgetHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
