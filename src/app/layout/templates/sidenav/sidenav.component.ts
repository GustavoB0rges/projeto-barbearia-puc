import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  getName: string;
  getEmail: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.getName = localStorage.getItem('nome');
  this.getEmail = localStorage.getItem('email');
  }

  onChangeToggleMenu(): void {
    this.sidenav.toggle();
  }
}
