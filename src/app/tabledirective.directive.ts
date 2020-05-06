import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {StateCovid} from './utils/state_covid_model'


export type SortColumn = keyof StateCovid | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': 'asc'};

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}


@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class TabledirectiveDirective {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    if(this.direction=='')
      this.direction = 'asc';
    
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
