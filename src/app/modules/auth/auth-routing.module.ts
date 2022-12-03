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
        path: 'funcionarios',
        loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionarioModule)
      },
      {
        path: 'administradores',
        loadChildren: () => import('./administradores/administrador.module').then(m => m.AdministradorModule)
      },
      {
        path: 'servicos',
        loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosModule)
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
