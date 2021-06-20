import { Component, OnInit } from '@angular/core';
// import { Form, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
// import { FormGroup, FormControl } from '@angular/forms';
// import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;

  constructor(
    private service: SharedService,
    private router: Router) { }

  // login = new FormGroup ({
  //   username: new FormControl('null',[
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  //   password: new FormControl('',[
  //     Validators.required])
  // })

  // get email(){
  //   return this.login.get('username')
  // }

  // get senha(){
  //   return this.login.get('password')
  // }

  ngOnInit(): void {
    // this.loginForm = new FormGroup ({
    //   email: new FormControl("", [
    //     Validators.required,
    //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    //   password: new FormControl("", [
    //     Validators.required])
    // })
    
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

  // logar() {
  //   // authentication with BD and if ok, go to overview.html
  // }
}
