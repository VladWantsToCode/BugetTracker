import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../core/services/budget.service';
import { Subscription } from 'rxjs';
import { Budget } from '../core/model/budget.model';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit, OnDestroy {
  constructor(private budgetService: BudgetService) { }
  subscription: Subscription;
  subscriptionBudget: Subscription;
  budgetList: Budget[];
  sortBy: string = '';
  isAcending = true;
  
  onEdit(budget: Budget) {
    this.budgetService.manageBudget.next({ action: "EDIT", budget: budget });
  }

  onDelete(id: number) {
    let answer = confirm("Are you sure to delete this item ?");
    if (answer === true) {
      this.budgetService.deleteBudget(id);
    }
  }

  onView(budget: Budget){
    this.budgetService.manageBudget.next({ action: "VIEW", budget: budget });
  }

  onSort(sortColumn: string) {
    this.isAcending = (this.sortBy == sortColumn) ? (this.isAcending ? false : true) : true;
    this.sortBy = sortColumn;
    this.budgetService.loadSortedBudgetListUI(sortColumn, this.isAcending);
  }

  ngOnInit(): void {
    this.subscription = this.budgetService.listBudgetUI.subscribe(
      (data: Budget[]) => {
        this.budgetList = data;
      }
    )
    this.subscriptionBudget = this.budgetService.manageBudget.subscribe(
      (data) => {
        if(data.action != "VIEW"){
          this.sortBy = "";
        }
      }
    )
    this.budgetService.loadBudgetListUI();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
