import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public urlServer = "https://jsonplaceholder.typicode.com/users";
  public urlColaboradores = "http://172.30.200.230/ventura_app/Controller/Controller_ERP.php?action=consultarColaboradores&key=ea18f4ac841772dfd6709b172643f808";
  public urllogin = "http://172.30.200.230/ventura_app/Controller/Controller_Login.php?action=ingresarSistema&key=ea18f4ac841772dfd6709b172643f808&";

  constructor(public http: HttpClient, public toastController: ToastController) { }

  getUsuario(id: string): Observable<any> {
    return this.http.get(this.urlServer + `/${id}`)
  }

  getAll() {
    return this.http.get(this.urlServer)
  }

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

  async mostrarError() {
    const toast = await this.toastController.create({
      message: ' sin conexión a la Base de Datos',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

}
