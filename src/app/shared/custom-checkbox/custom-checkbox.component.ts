import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {
  @Input() checkOptions: any[] = [];
  @Input() headerOptions: string = '';
  @Output() checkboxChanged = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
  }

  IdList: any[] = this.checkOptions.map(item => item.value);

  allChecked = true;
  indeterminate = true;

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptions = this.checkOptions.map(item => ({
        ...item,
        checked: true
      }));
      this.checkboxChanged.emit(this.select);
    } else {
      this.checkOptions = this.checkOptions.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  select: any[] = [];

  updateSingleChecked(): void {
    this.select = this.checkOptions.filter(item => item.checked).map(item1 => item1.value);
    if (this.checkOptions.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptions.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    this.checkboxChanged.emit(this.select);
  }

}
