import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIURL = 'https://dimensionapi.azurewebsites.net/api';

  constructor(private http:HttpClient) { }

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
  
  // method CRUD de usuarios
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
