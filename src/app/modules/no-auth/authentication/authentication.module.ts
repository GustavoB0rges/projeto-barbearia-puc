import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/shared/material/material.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { NgxMaskModule } from 'ngx-mask';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthenticationModule { }
