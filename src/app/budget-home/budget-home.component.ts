import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../core/services/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.css']
})
export class BudgetHomeComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  totalBudget = 0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.checkLocalStorage();
    this.subscription = this.budgetService.totalBudget.subscribe(
      (data : number) => {
        this.totalBudget = data;
      }
    );
    this.budgetService.loadTotalBudget();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
