import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [UserService]
})
export class CadastroComponent implements OnInit {

  constructor(public userService: UserService) { }

  register = new FormGroup ({
    nomeFuncionario: new FormControl('', [
      Validators.required]),
    sobrenomeFuncionario: new FormControl('', [
      Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(11)]),
    
    
    loginFuncionario: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    senhaFuncionario: new FormControl('', [
      Validators.required]),
    }
  )

  get nomeFuncionario(){
    return this.register.get('nomeFuncionario')
  }

  get sobrenomeFuncionario(){
    return this.register.get('sobrenomeFuncionario')
  }

  get telefone(){
    return this.register.get('telefone')
  }

  get loginFuncionario(){
    return this.register.get('loginFuncionario')
  }

  get senhaFuncionario(){
    return this.register.get('senhaFuncionario')
  }

  showSuccesMessage: boolean;
  serverErrorMessage: string;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccesMessage = true;
        setTimeout(() => this.showSuccesMessage = false, 5000);
        this.resetForm(form);
      }
    )
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      nomeFuncionario: '',
      sobrenomeFuncionario: '',
      // phone: '',
      loginFuncionario: '',
      senhaFuncionario: ''
    };
    form.resetForm();
    this.serverErrorMessage='';
  }

}
