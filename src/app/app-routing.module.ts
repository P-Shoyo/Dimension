import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

//import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { OverviewComponent } from './overview/overview.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ShowDataComponent } from './show-data/show-data.component';


const routes: Routes = [
  // caminho/path do URL pra qndo for digitado, encaminha para o componente/pagina
  {path: '', component:HomeComponent},
  {path: 'login' , component:UsuarioComponent},
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