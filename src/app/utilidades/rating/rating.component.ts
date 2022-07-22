import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() maxRating: number = 5;
  @Input() ratingSelected: number = 0;
  @Output() rated: EventEmitter<number> = new EventEmitter<number>();

  ratingArray: any[] = [];
  lastRated: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.ratingArray = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number): void{
    this.ratingSelected = index + 1;
  }

  handleMouseLeave(): void{
    this.ratingSelected = this.lastRated !== 0 ? this.lastRated : 0
  }

  rate(index:number): void{
    this.ratingSelected = index + 1;
    this.lastRated = this.ratingSelected;
    this.rated.emit(this.ratingSelected);
  }
}
