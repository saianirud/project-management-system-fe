import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Output() emitSearchText = new EventEmitter<any>();

  public searchText = '';

  constructor() { }

  ngOnInit(): void {
  }

  emitSearch() {
    this.emitSearchText.emit(this.searchText);
  }

}
