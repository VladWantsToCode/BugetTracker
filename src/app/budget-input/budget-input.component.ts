import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BudgetService } from '../core/services/budget.service';
import { Budget } from '../core/model/budget.model';

@Component({
  selector: 'app-budget-input',
  templateUrl: './budget-input.component.html',
  styleUrls: ['./budget-input.component.css']
})
export class BudgetInputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalInput') modalInput: TemplateRef<any>;
  closeResult: string;
  budgetForm: FormGroup;
  subscription: Subscription;
  inputMode = 'ADD';
  editId = 0;

  constructor(
    private modalService: NgbModal,
    private budgetService: BudgetService
  ) { }


  ngAfterViewInit() {
    this.subscription = this.budgetService.manageBudget.subscribe(
      (data) => {
        this.inputMode = data.action;
        if (data.action == 'ADD') {
          this.onClear();
        } else if (data.action == 'EDIT'){
          this.editId = data.budget.id;
          this.budgetForm.setValue({
            "name": data.budget.name,
            "type": data.budget.type,
            "amount": data.budget.amount,
            "remarks": data.budget.remarks,
            "itemDate": data.budget.itemDate
          });
        }else{
          this.budgetForm.setValue({
            "name": data.budget.name,
            "type": data.budget.type,
            "amount": data.budget.amount,
            "remarks": data.budget.remarks,
            "itemDate": data.budget.itemDate
          });
        }

        this.modalService.open(this.modalInput, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          console.log(this.closeResult);
        }, (reason) => {
          console.log(this.closeResult);
        });
      }
    )
  }
  
  onClear(){
    this.budgetForm.reset();
    this.budgetForm.controls['type'].setValue("income");
    this.budgetForm.controls['itemDate'].setValue(this.currentDate());
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    this.budgetForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "type": new FormControl('', Validators.required),
      "amount": new FormControl('', Validators.required),
      "remarks": new FormControl('', Validators.required),
      "itemDate": new FormControl(this.currentDate(), Validators.required)
    });
  }

  private currentDate() {
    const date = new Date();
    return date.toISOString().substring(0, 10);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    const budgetData = new Budget(
      0,
      this.budgetForm.value['name'],
      this.budgetForm.value['type'],
      this.budgetForm.value['amount'],
      this.budgetForm.value['remarks'],
      this.budgetForm.value['itemDate']
    );

    if (this.inputMode == 'ADD') {
      this.budgetService.addBudget(
        budgetData
      );
    } else if(this.inputMode == 'EDIT'){
      budgetData.id = this.editId;
      this.budgetService.updateBudget(
        budgetData
      );
    }
    this.modalService.dismissAll();
  }
}
