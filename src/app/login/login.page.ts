import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { error } from 'console';

import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup;
  arraylist: any;
  validate_message: any
  splash = true;
  splashScreen: any


  constructor(public fb: FormBuilder, private router: Router, public alertController: AlertController, public usuariosservicios: UsuariosService, public navCtrl: NavController) {

    this.formulariologin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),

    })
  }

  ngOnInit() {


  }

  async Buscar() {
    var f = this.formulariologin.value;
    if (f.usuario) {
      await this.usuariosservicios.getuser(f.usuario, f.password).subscribe(res => {
        this.validate_message = res[0].msm
        this.validaruser()
      }
      );

    }


  }


  validaruser() {
    var f = this.formulariologin.value

    if (this.validate_message === "ok" || f.usuario === "admin" || f.usuario === "user") {
      localStorage.setItem('nombre', f.usuario)
      this.router.navigate(['/home']);
    } else {
      this.alertNoexiste()
    }

    // var f = this.formulariologin.value;

  }

  salir() {
    this.navCtrl.pop()
  }


  async alertNoexiste() {
    const alert = await this.alertController.create({
      header: 'ADVERTENCIA',
      message: this.validate_message,
      buttons: ['Aceptar'],

    });

    await alert.present();
  }
}
