import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetItem } from 'src/shared/models/budget-items.model';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {
  
  @Input() item: BudgetItem;
  @Output() formSubmit: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  isNewItem: boolean; 

  constructor() { }

  ngOnInit(): void {
    if(this.item){
      // check if item has a value
      //this means existing item was passed into this component
      this.isNewItem = false;
    }else{
      this.isNewItem = true;
      this.item = new BudgetItem('', null);
    }
  }

  onSubmit(form: NgForm){
    //Propogate this up with the EventEmitter
    this.formSubmit.emit(form.value);
    form.reset(); //ngForm handles the form to reset on submission!
  }

}
