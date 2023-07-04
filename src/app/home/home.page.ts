import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  localname = localStorage.getItem('nombre')
  roles: any
  constructor(private router: Router) { }

  ngOnInit() {
    this.prueba()
  }

  crearSolicitud() {
    this.router.navigate(['/solicitud']);
  }
  Pedir() {
    this.router.navigate(['/restaurante']);
  }
  inactivar() {
    this.router.navigate(['/inactivarpermisos']);
  }
  permisos() {
    this.router.navigate(['/user-licencia']);
  }

  prueba() {
    this.roles = []
    if (this.localname === "admin") {
      this.roles = [
        { nombre: 'CREAR', mostrar: true },
        { nombre: 'INACTIVAR', mostrar: true },
        { nombre: 'RESTAURANTE', mostrar: true },
        { nombre: 'GENERAR', mostrar: true }]
    } else if (this.localname === 'user') {
      this.roles = [
        { nombre: 'CREAR', mostrar: false },
        { nombre: 'INACTIVAR', mostrar: false },
        { nombre: 'RESTAURANTE', mostrar: false },
        { nombre: 'GENERAR', mostrar: true }]
    } else {
      this.roles = [
        { nombre: 'CREAR', mostrar: false },
        { nombre: 'INACTIVAR', mostrar: false },
        { nombre: 'RESTAURANTE', mostrar: false },
        { nombre: 'GENERAR', mostrar: true }]
    }
  }
}
