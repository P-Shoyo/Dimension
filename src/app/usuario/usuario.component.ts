import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  // constructor(private route: ActivatedRoute, private router: Router) { }
  constructor() { }

  ngOnInit() {
  }

  // showLogin() {
  //   this.router.navigate(['login'], {relativeTo: this.route});
  // }

  // showRegister() {
  //   this.router.navigate(['cadastro'], {relativeTo: this.route});
  // }

}
