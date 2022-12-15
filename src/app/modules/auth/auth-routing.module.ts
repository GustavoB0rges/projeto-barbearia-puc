import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../no-auth/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'clientes',
        canActivate: [AuthGuard],
        loadChildren: () => import('./clientes/cliente.module').then(m => m.ClienteModule)
      },
      {
        path: 'agendamentos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoModule)
      },
      {
        path: 'funcionarios',
        canActivate: [AuthGuard],
        loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionarioModule)
      },
      {
        path: 'administradores',
        canActivate: [AuthGuard],
        loadChildren: () => import('./administradores/administrador.module').then(m => m.AdministradorModule)
      },
      {
        path: 'servicos',
        canActivate: [AuthGuard],
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
