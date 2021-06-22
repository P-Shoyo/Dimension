import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from './usuario/login/login.component';
import { User } from './user';

export interface loginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIURL = 'https://dimensionapi.azurewebsites.net/api';
  // readonly APIURL = 'http://localhost:62165/api';

  constructor( private http: HttpClient ) { }

  // method GET registros para o Dash
  getRegistroList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro');
  }

  getRegistroRamList(id: any):Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetRam/' + id);
  }

  getRegistroSoList(id: any):Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetSo/' + id);
  }

  getRegistroCpuList(id: any):Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetCpu/' + id);
  }

  getRegistroPlacaList(id: any):Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetPlaca/' + id);
  }

  getRegistroDiscoList(id: any):Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetDisco1/' + id);
  }

  getRegistroDisco2List(id: any):Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/registro/GetDisco2/' + id);
  }

  getUsuarioList():Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/usuario');
  }

  addUsuario(val: any) {
    return this.http.post(this.APIURL + '/usuario', val);
  }

  updateUsuario(id: number, val: any) {
    // return this.http.put(this.APIURL + '/usuario/' + id + val);
    return this.http.put(`${this.APIURL}/usuario/${id}/${val}`, id, val);
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.APIURL + '/usuario/'+ id);
  }

  getAllUsuarios():Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/usuario/GetAllUsers');
  }

  // get CONFIG
  // getConfigList():Observable<any[]> {
  //   return this.http.get<any>(this.APIURL + '/maquina');
  // }
}
