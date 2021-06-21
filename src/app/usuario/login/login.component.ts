import { Component, OnInit } from '@angular/core';
import { Form, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;
  usersList: any;
  serverErrorMessage: string;
  showSuccesMessage: boolean;

  constructor(
    private service: SharedService,
    public userService: UserService,
    private router: Router) { }

  // login = new FormGroup ({
  //   loginFuncionario: new FormControl('null',[
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  //   senhaFuncionario: new FormControl('',[
  //     Validators.required])
  // })

  // get email(){
  //   return this.login.get('loginFuncionario')
  // }

  // get senha(){
  //   return this.login.get('senhaFuncionario')
  // }

  ngOnInit(): void {

    this.showSuccesMessage = true;
    // this.userService.getUser().subscribe(
    //   data => {
    //     // this.usersList = data;
    //     console.log(data);
    //     for (let i = 0; i < data["length"]; i++) {
    //       const element = data[i];
    //       if (element.loginFuncionario == this.userService.selectedUser.loginFuncionario) {
    //         console.log('IGUAL');
    //         this.router.navigate(['overview']);
    //       } else if (!this.userService.selectedUser.loginFuncionario) {
    //         console.log('VAZIO');            
    //       }
    //     }
    //   }
    // )

    // this.loginForm = new FormGroup ({
    //   email: new FormControl("", [
    //     Validators.required,
    //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    //   password: new FormControl("", [
    //     Validators.required])
    // })
    
  }

  onSubmit(loginForm: NgForm) {
    // console.log(loginForm);
    this.userService.getUser().subscribe(
      (data: any[]) => {
        // console.log(data);
        console.log(this.userService.selectedUser.loginFuncionario);
        for (let i = 0; i <= data.length; i++) {
          if (data[i].loginFuncionario === this.userService.selectedUser.loginFuncionario ) {
            //console.log('IGUAL');
            console.log(data[i].loginFuncionario);
            // var idMaquina = data[i].idFuncionario;
            var funcionario: string;
            // this.userService.getMaquinas(idMaquina);
            // localStorage.setItem(idFunc, data[i].idFuncionario);
            localStorage.setItem('funcionario', JSON.stringify(data[i]));
            
            this.router.navigate(['overview']);

          // } else {
          //   console.log('VAZIO'); 
          //   this.resetForm(loginForm); 
          //   this.showSuccesMessage = false;
          //   this.serverErrorMessage = 'Usuário não existe, faça o seu cadastro!';  
          }
        }
      }
    )
  }

  resetForm(loginForm: NgForm) {
    this.userService.selectedUser = {
      nomeFuncionario: '',
      sobrenomeFuncionario: '',
      // phone: '',
      loginFuncionario: '',
      senhaFuncionario: ''
    };
    loginForm.resetForm();
    this.serverErrorMessage='';
  }

  
  // onSubmit(loginForm: NgForm) {
  //   console.log(loginForm.value);
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   // this.service.getUsuarioList(this.loginForm.value).pipe(
  //   //   map(token => this.router.navigate(['admin']))
  //   // ).subscribe();    
  // }
}

// export function getIdUser(id) {
//   const idUser = id;
//   console.log(idUser);
// }

