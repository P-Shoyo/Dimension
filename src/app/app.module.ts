import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShowDataComponent } from './show-data/show-data.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ShowUserComponent } from './usuario/show-user/show-user.component';
import { AddEditUserComponent } from './usuario/add-edit-user/add-edit-user.component';
import { SharedService } from './shared.service';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowDataComponent,
    UsuarioComponent,
    ShowUserComponent,
    AddEditUserComponent,
    HomeComponent,
    OverviewComponent,
    ConfiguracoesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
