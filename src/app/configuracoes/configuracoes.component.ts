import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  userList: any[];
  configList: any[];
  userLog: any;
  maquinasList: any;
  idMaquina: any;
  user: any;
  idFuncionario: any;

  psswd: string;
  psswdConfirm: string;

  constructor (
    private service:SharedService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit() {

    var retrievedLogin = localStorage.getItem('funcionario');
    this.idFuncionario = JSON.parse(retrievedLogin).idFuncionario;
    this.userLog = JSON.parse(retrievedLogin);
    this.user = JSON.parse(retrievedLogin).nomeFuncionario;
    //console.log(this.userLog);
    

    this.userService.getMaquinas(this.idFuncionario)
      .subscribe((res: any) => { 
        console.log(res);
        this.maquinasList = res;
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          this.idMaquina = element.idMaquina;
          console.log(this.idMaquina);          
        }
      }
    )

  }

  updatePassword() {
    if (this.psswd == this.psswdConfirm) {
      // console.log(this.psswd);
      this.service.updateUsuario(this.idFuncionario, this.psswd).subscribe(
        res => {
          console.log(res);
        }
      )
      alert('Senha atualizada com sucesso!');
    } else {
      alert('Senhas não coincidem!');
    }
  }

  deleteAccount() {
    if (confirm('Você tem certeza?')) {
      this.service.deleteUsuario(this.idFuncionario).subscribe(
        res => {
          console.log(res);
          alert("Usuário excluído com sucesso!")
          localStorage.clear();
          this.router.navigate(['login']);        
        },
        error => {
          console.log(error);
        }
      )        
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
