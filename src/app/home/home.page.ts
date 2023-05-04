import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  localname = localStorage.getItem('nombre')

  constructor( private router: Router) { }

  ngOnInit() {
  }

  crearSolicitud(){
    this.router.navigate(['/solicitud']);
  }
  Pedir(){
    this.router.navigate(['/restaurante']);
  }
  inactivar(){
    this.router.navigate(['/inactivarpermisos']);
  }

}
