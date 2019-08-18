import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AllServices} from './../services/AllServices';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private _services:AllServices,private _router: Router) { }
  usuario= { // deben crear una estructura de acuerdo al back para que se puedan registrar los datos, revisen los servicios que van a usar
    cedula:"",
    pasword: "",
    nombreUser:"",
    apellidoUser:"",
    email:"",
    phone:""
  }
  isvisible = true;
  errLog ="";
  ngOnInit() {
  }

  //createPacient(nombres:string,apellidos:string,ci:string,phone:string,email:string){ // crea el paciente revicen el html
  createUser(){

    this.isvisible = true;
    this._services.createUser(this.usuario).subscribe(data=>{
      console.log(data);
      this._router.navigate(["/user"])

    },err=>{
      this.isvisible = false
      this.errLog = err.error.log
    })
  }

}
