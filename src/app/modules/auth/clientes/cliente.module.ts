import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from 'src/shared/material/material.module';
import { FilterPipe } from 'src/shared/pipe/filter.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteIndexComponent } from './cliente-index/cliente-index.component';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: ClienteIndexComponent },
  { path: 'new', component: ClienteFormComponent },
  { path: ':id/edit', component: ClienteFormComponent },
  { path: ':id/delete', component: ClienteFormComponent },
  { path: ':id/view', component: ClienteFormComponent },
];

@NgModule({
  declarations: [
    ClienteIndexComponent,
    ClienteFormComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    LayoutModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClienteModule { 
  
}
