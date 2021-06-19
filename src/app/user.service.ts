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

  postUser (user: User) {
    return this.http.post(environment.apiUrl + '/usuario', user)
  }
}
