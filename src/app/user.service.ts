import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    nomeFuncionario: '',
    sobrenomeFuncionario: '',
    // phone: '',
    loginFuncionario: '',
    senhaFuncionario: ''
  };

  constructor(private http: HttpClient) { }

  readonly apiUrl = 'https://dimensionapi.azurewebsites.net/api';

  postUser (user: User) {
    // return this.http.post(environment.apiUrl + '/usuario', user)
    return this.http.post(this.apiUrl + '/usuario', user)
  }
}
