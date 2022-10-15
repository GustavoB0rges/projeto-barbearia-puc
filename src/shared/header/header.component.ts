import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() showOperation: boolean = true;
  @Output() add = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
