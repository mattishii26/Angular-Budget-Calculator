import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-items.model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(item: BudgetItem){
    this.delete.emit(item); //sends the BudgetItem item to the parent
  }

  onCardClick(item: BudgetItem){
    //show the edit modal
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item, //data being injected
    });

    dialogRef.afterClosed().subscribe(result => {
      // check if result has a value
      if(result){
        this.update.emit({
          old: item,
          new: result
        });
      }
    });
  }
}

export interface UpdateEvent{
  old: BudgetItem;
  new: BudgetItem;
}