import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mat-multi-select',
  templateUrl: './mat-multi-select.component.html',
  styleUrls: ['./mat-multi-select.component.scss']
})
export class MatMultiSelectComponent implements OnInit {

  @Input() label;
  @Input() data;
  @Input() defaultValues = [];

  @Output() valuesSelected = new EventEmitter();

  public selectedValues = [];

  constructor() { }

  ngOnInit(): void {
    this.selectedValues = this.defaultValues.map(x => x.value);
    if (this.data.length > 0 && this.defaultValues.length === this.data.length) {
      this.selectedValues.unshift('All');
    }

    this.emitValues();
  }

  allOptionClicked() {
    const index = this.selectedValues.indexOf('All');
    if (index !== -1) {
      this.selectedValues = ['All', ...this.data.map(x => x.value)];
    } else {
      this.selectedValues = [];
    }

    this.emitValues();
  }

  singleOptionClicked() {
    const index = this.selectedValues.indexOf('All');
    if (index !== -1) {
      let modifiedUsers = [...this.selectedValues]
      modifiedUsers.splice(index, 1);
      this.selectedValues = [...modifiedUsers];
    } else if (this.selectedValues.length === this.data.length) {
      this.selectedValues = ['All', ...this.selectedValues];
    }

    this.emitValues();
  }

  emitValues() {

    let modifiedValues = [...this.selectedValues];

    const index = modifiedValues.indexOf('All');
    if (index !== -1) {
      modifiedValues.splice(index, 1);
    }

    this.valuesSelected.emit(modifiedValues);
  }

}
