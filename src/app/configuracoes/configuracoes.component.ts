import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  userList: any[];
  configList: any[];

  constructor (private service:SharedService) { }

  ngOnInit() {

    this.refreshDashList();
    this.refreshConfigList();

    // this.service.getAllUsuarios().subscribe(data => {
    //   this.userList = data;
    //   console.log(data);
    //   // const nomeCompleto = data[0].nomeFuncionario +" " + data[0].sobrenomeFuncionario
    // });
  }

  refreshDashList() {
    this.service.getAllUsuarios().subscribe(data => {
      this.userList = data;
    });
  }

  refreshConfigList() {
    this.service.getConfigList().subscribe(data => {
      this.configList = data;
    });
  }

}
