import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/cliente.module').then(m => m.ClienteModule)
      },
      {
        path: 'agendamentos',
        loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoModule)
      },
      {
        path: '**',
        redirectTo: ''
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
