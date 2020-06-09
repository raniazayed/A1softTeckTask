import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Output() currentPageNum: EventEmitter<any> = new EventEmitter;
  @Input('pageNum') pageNum: number;
  @Input('total') total: number;
  @Input('itemsPerPage') itemsPerPage: number;
  totalPages: number;
  countList: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPage || 10;
    this.totalPages = Math.ceil(this.total / this.itemsPerPage);
    let _offset = this.itemsPerPage / 2;
    if (this.totalPages <= this.itemsPerPage) {
      this.countList = Array
        .apply(null, {
          length: this.totalPages
        })
        .map(Number.call, Number);
    } else if (this.pageNum < _offset && this.totalPages > this.itemsPerPage) {
      this.countList = Array
        .apply(null, {
          length: this.itemsPerPage
        })
        .map(Number.call, Number);
    } else {
      this.countList = [];
      for (var c = this.pageNum - _offset;
        (c < this.totalPages && c < (this.pageNum + _offset)); c++) {
        this.countList.push(c);
      }
    }
  }

  ngOnChanges(changes) {
    // if (changes.total && (changes.total ? (changes.total.currentValue ? true : false) : false )) {
    //   this.ngOnInit();
    // }
  }

  paginate(number) {
    if (number === this.pageNum) return;
    this.pageNum = number;
    this.currentPageNum.emit(this.pageNum);
  }

}
