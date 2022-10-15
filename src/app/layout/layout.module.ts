import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/shared/material/material.module';
import { LayoutComponent } from './layout.component';
import { SidenavComponent } from './templates/sidenav/sidenav.component';
import { AppRoutingModule } from '../app-routing.module';
import { ToolBarComponent } from './templates/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolBarComponent,
    SidenavComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
  ],
  exports: []
})
export class LayoutModule { }
