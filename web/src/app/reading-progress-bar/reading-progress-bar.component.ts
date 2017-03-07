import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jfb-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.css']
})
export class ReadingProgressBarComponent implements OnInit {
  @Input('catalog') catalog: any[];
  constructor() { }

  ngOnInit() {
  }



}
