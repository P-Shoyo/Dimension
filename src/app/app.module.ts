import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShowDataComponent } from './show-data/show-data.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './usuario/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { ForgotComponent } from './usuario/forgot/forgot.component';

import { UserService } from './user.service';
import { SharedService } from './shared.service';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { NumberDirective } from './usuario/cadastro/numbers-only.directive';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ShowDataComponent,
    UsuarioComponent,
    LoginComponent,
    CadastroComponent,
    ForgotComponent,
    HomeComponent,
    OverviewComponent,
    ConfiguracoesComponent,
    DashboardComponent,
    ForgotComponent,
    NumberDirective 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [SharedService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
