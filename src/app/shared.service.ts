import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from './usuario/login/login.component';

export interface loginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // readonly APIURL = 'https://dimensionapi.azurewebsites.net/api';
  readonly APIURL = 'http://localhost:62165/api';

  constructor( private http: HttpClient ) { }

  // method GET registros para o Dash
  getRegistroList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro');
  }

  getRegistroRamList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetRam');
  }

  getRegistroSoList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetSo');
  }

  getRegistroCpuList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetCpu');
  }

  getRegistroPlacaList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetPlaca');
  }

  getRegistroDiscoList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetDisco');
  }
  
  // method CRUD de usuarios
  // login(model: any) {
  //   return this.http.post(this.APIURL + 'usuario', model).pipe(
  //     map((response: any) {
  //       const user = response;
  //       if (user.) {
          
  //       }
  //     })
  //   )
  // }

  // login(loginForm: LoginForm) {
  //   return this.http.post<any>('api/usuario', { email: loginForm.email, password: loginForm}).pipe(
  //     map((token) => {
  //       console.log('token');
  //       localStorage.setItem('token-test', token.access_token);
  //       return token;
  //     })
  //   )
  // }

  getUsuarioList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/usuario');
  }

  addUsuario(val: any) {
    return this.http.post(this.APIURL + '/usuario', val);
  }

  updateUsuario(val: any) {
    return this.http.put(this.APIURL + '/usuario', val);
  }

  deleteUsuario(val: any) {
    return this.http.delete(this.APIURL + '/usuario/', val);
  }

  getAllUsuarios():Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/usuario/GetAllUsers');
  }

  // get CONFIG
  getConfigList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/componente');
  }
}
