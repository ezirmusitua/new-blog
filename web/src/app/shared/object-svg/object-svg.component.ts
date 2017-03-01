import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jfb-object-svg',
  templateUrl: './object-svg.component.html',
  styleUrls: ['./object-svg.component.css']
})
export class ObjectSvgComponent implements OnInit {
  @Input() src: string;
  @Input() content: string = 'SVG'
  constructor() { }

  ngOnInit() {
    console.log(this.src);
  }

}
