import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [UserService]
})
export class CadastroComponent implements OnInit {

  constructor(
    public userService: UserService,
    public router: Router
    ) { }

  showSuccesMessage: boolean;
  serverErrorMessage: string;

  cadastro: FormGroup;

  ngOnInit(): void {

    this.cadastro = new FormGroup({
      nomeFuncionario: new FormControl( this.userService.selectedUser.nomeFuncionario, [
        Validators.required
      ]),
      sobrenomeFuncionario: new FormControl( this.userService.selectedUser.sobrenomeFuncionario, [
        Validators.required
      ]),
      cpfFuncionario: new FormControl( this.userService.selectedUser.cpfFuncionario, [
        Validators.required
      ]),
      loginFuncionario: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      senhaFuncionario: new FormControl('', [
        Validators.required
      ])
    })
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccesMessage = true;
        setTimeout(() => this.showSuccesMessage = false, 5000);
        this.resetForm(form);
        //console.log(res);
        // this.router.navigate(['overview']);
        this.router.navigate(['download']);
      }
    )
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      nomeFuncionario: '',
      sobrenomeFuncionario: '',
      cpfFuncionario: '',
      loginFuncionario: '',
      senhaFuncionario: ''
    };
    form.resetForm();
    this.serverErrorMessage='';
  }

}
