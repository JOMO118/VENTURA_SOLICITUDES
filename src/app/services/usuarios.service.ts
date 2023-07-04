import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public urlColaboradores = "http://172.30.200.230/ventura_app/Controller/Controller_ERP.php?action=consultarColaboradores&key=ea18f4ac841772dfd6709b172643f808";
  public urllogin = "http://172.30.200.230/ventura_app/Controller/ApplicationPermitsAndLicenses/Controller_Login.php?action=ingresarSistema&key=ea18f4ac841772dfd6709b172643f808&";
  public urlUser = "http://172.30.200.230/ventura_app/Controller/ApplicationPermitsAndLicenses/Controller_User.php?action=mostrar_info_user&key=ea18f4ac841772dfd6709b172643f808&usuario=";

  constructor(public http: HttpClient, public toastController: ToastController) { }


  getAllColaboradores() {
    return this.http.get(this.urlColaboradores).pipe(
      map((res) => {
        return res
      }),
      catchError((err) => {
        this.mostrarError()
        return err
      })
    )
  }

  getuser(usuario: String, password: String): Observable<any> {
    return this.http.get(this.urllogin + `usuario=${usuario}&password=${password}`).pipe(
      map((res) => {
        return res
      }),
      catchError((err) => {
        this.mostrarError()
        return err

      })
    )
  }

  getDataUser(usuario: String): Observable<any> {
    return this.http.get(this.urlUser + `${usuario}`).pipe(
      map((res) => {
        return res
      }),
      catchError((err) => {
        this.mostrarError()
        return err

      })
    )
  }

  async mostrarError() {
    const toast = await this.toastController.create({
      message: ' sin conexión a la Base de Datos',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

}
