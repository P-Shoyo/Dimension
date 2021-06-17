import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

//import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ShowUserComponent } from './usuario/show-user/show-user.component';
import { AddEditUserComponent } from './usuario/add-edit-user/add-edit-user.component';
import { OverviewComponent } from './overview/overview.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ShowDataComponent } from './show-data/show-data.component';


const routes: Routes = [
  // caminho/path do URL pra qndo for digitado, encaminha para o componente/pagina
  {path: '', component:HomeComponent},
  // {
  //   path: 'usuario' , 
  //   component: UsuarioComponent ,
  //   children: [
  //     { path: './cadastro' , component:AddEditUserComponent },
  //     { path: 'login' , component:ShowUserComponent }
  //   ]
  // },

  {path: 'cadastro' , component:AddEditUserComponent},
  {path: 'login' , component:UsuarioComponent},
  // {path: 'login' , component:ShowUserComponent},

  {path: 'overview', component:OverviewComponent},
  {path: 'configuracoes', component:ConfiguracoesComponent},
  {path: 'analytics', component:ShowDataComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    ChartsModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }