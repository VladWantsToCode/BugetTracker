import { Subject } from 'rxjs';
import { Budget } from '../model/budget.model';


export class BudgetService {
    manageBudget = new Subject<{ action: string, budget: Budget }>();
    listBudgetUI = new Subject<Budget[]>();
    totalBudget = new Subject<number>();

    private budgetList: Budget[];

    checkLocalStorage() {
        if (localStorage.getItem('budgetList') === null) {
            localStorage.setItem('budgetList', JSON.stringify([]));
            console.log('Local Storage not available');
        }
        this.loadBudgetList();
    }

    addBudget(budget: Budget) {
        this.loadBudgetList();
        budget.id = this.getLatestId();
        this.budgetList.push(budget);
        this.afterChangeCall();
    }

    updateBudget(budget: Budget) {
        this.loadBudgetList();
        this.budgetList[this.getIndexById(budget.id)] = budget;
        this.afterChangeCall();
    }

    deleteBudget(budgetId: number) {
        this.loadBudgetList();
        this.budgetList.splice(this.getIndexById(budgetId), 1);
        this.afterChangeCall();
    }

    loadTotalBudget() {
        this.loadBudgetList();
        let tBudget = 0;
        this.budgetList.forEach((item) => {
            if (item.type == "expense") {
                tBudget -= item.amount;
            } else {
                tBudget += item.amount;
            }
        });
        this.totalBudget.next(tBudget);
    }

    private afterChangeCall() {
        this.setBudgetListLocalStorage();
        this.loadBudgetListUI();
        this.loadTotalBudget();
    }

    private setBudgetListLocalStorage() {
        localStorage.setItem('budgetList', JSON.stringify(this.budgetList));
    }

    private loadBudgetList() {
        this.budgetList = JSON.parse(localStorage.getItem('budgetList'));
    }

    private getLatestId(): number {
        if (this.budgetList.length === 0) {
            return 0;
        } else {
            return this.budgetList[this.budgetList.length - 1].id + 1;
        }
    }

    private getIndexById(id: number): number {
        return this.budgetList.findIndex(x => x.id == id);
    }

    loadBudgetListUI() {
        this.listBudgetUI.next(this.budgetList.slice());
    }

    loadSortedBudgetListUI(sortColumn: string, isAsending: boolean) {

        function dynamicSort(property, isAsending){
            let sortOrder = isAsending ? 1 : -1;
            return function(a, b){
                if(a[property] < b[property]){
                    return -1 * sortOrder;
                }else if(a[property] > b[property]){
                    return 1 * sortOrder;
                }else{
                    return 0 * sortOrder;
                }
            }
        }
        this.listBudgetUI.next(this.budgetList.slice().sort(dynamicSort(sortColumn, isAsending)));
    }
}