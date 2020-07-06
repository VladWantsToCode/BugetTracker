import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    img{
      margin-top : -10px;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private budgetService: BudgetService
  ) { }
  
  ngOnInit(): void {
  }

  onAdd(){
    this.budgetService.manageBudget.next({ action: "ADD", budget: null});
  }
}
