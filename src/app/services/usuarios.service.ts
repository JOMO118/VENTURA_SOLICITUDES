import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public urlServer = "https://jsonplaceholder.typicode.com/users";
  public urlColaboradores = "http://172.30.200.230/ventura_app/Controller/Controller_ERP.php?action=consultarColaboradores&key=ea18f4ac841772dfd6709b172643f808";
  public urllogin = "http://172.30.200.230/ventura_app/Controller/Controller_Login.php?action=ingresarSistema&key=ea18f4ac841772dfd6709b172643f808&";

  constructor(public http: HttpClient) { }

  getUsuario(id: string): Observable<any> {
    return this.http.get(this.urlServer + `/${id}`)
  }

  getAll() {
    return this.http.get(this.urlServer)
  }

  getAllColaboradores() {
    return this.http.get(this.urlColaboradores)
  }

  getuser(usuario: String, password: String): Observable<any> {

    return this.http.get(this.urllogin + `usuario=${usuario}&password=${password}`)
  }

}
