import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShowDataComponent } from './show-data/show-data.component';
import { ShowData2Component } from './show-data-2/show-data-2.component';
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

import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadComponent } from './usuario/download/download.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowDataComponent,
    ShowData2Component,
    UsuarioComponent,
    LoginComponent,
    CadastroComponent,
    ForgotComponent,
    HomeComponent,
    OverviewComponent,
    ConfiguracoesComponent,
    ForgotComponent,
    NumberDirective,
    DownloadComponent
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
