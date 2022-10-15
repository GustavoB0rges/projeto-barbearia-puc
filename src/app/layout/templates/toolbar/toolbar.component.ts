import { Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/shared/dialog/dialog.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolBarComponent implements OnInit {
  @Input() sidenav : any;
  @Input() label : any;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  
  @Output() changeToggleMenu = new EventEmitter();
  
  selected = 'option3';
  sideBarOpen = true;

  constructor(private router: Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  toggleMenu(): void {
    this.changeToggleMenu.emit();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}

