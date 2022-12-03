import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from 'src/shared/material/material.module';
import { FilterModule } from 'src/shared/pipe/filter.module';
import { FilterPipe } from 'src/shared/pipe/filter.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { FuncionarioFormComponent } from './funcionarios-form/funcionarios-form.component';
import { FuncionarioIndexComponent } from './funcionarios-index/funcionarios-index.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: FuncionarioIndexComponent },
  { path: 'new', component: FuncionarioFormComponent },
  { path: ':id/edit', component: FuncionarioFormComponent },
  { path: ':id/delete', component: FuncionarioFormComponent },
  { path: ':id/view', component: FuncionarioFormComponent },
];

@NgModule({
  declarations: [
    FuncionarioIndexComponent,
    FuncionarioFormComponent,
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
    FilterModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuncionarioModule { 
  
}
