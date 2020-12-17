import { Component, EventEmitter, OnInit, Input, Output, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-progress-widget',
  templateUrl: './progress-widget.component.html',
  styleUrls: ['./progress-widget.component.css']
})
export class ProgressWidgetComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {

  @Input() currentValue: number;
  @Input() overallValue: number;
  @Output() submitted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('Current value: ' + this.currentValue);
    console.log('Overall value: ' + this.overallValue);
  }

  ngAfterViewInit() {
    console.log('After view init');
  }

  ngAfterContentInit() {
    console.log('After content init');
  }

  clicked($event) {
    this.submitted.emit($event);
  }

}
