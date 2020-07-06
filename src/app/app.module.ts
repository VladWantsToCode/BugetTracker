import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetHomeComponent } from './budget-home/budget-home.component';
import { BudgetInputComponent } from './budget-input/budget-input.component';

import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from './core/services/budget.service';
import { CurrencyPipe } from './core/pipes/currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BudgetListComponent,
    BudgetHomeComponent,
    BudgetInputComponent, 
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [BudgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
