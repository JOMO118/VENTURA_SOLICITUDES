import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  mostrarBoton: boolean = true;
  headerText: any;

  constructor(private router: Router, public alertController: AlertController) {
    this.setHeaderText();
  }

  setHeaderText() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.headerText = this.getHeaderTextFromUrl(url);
        this.mostrarBoton = this.shouldShowButton(url);
      }
    });
  }

  shouldShowButton(url: string): boolean {
    if (url === '/login') {
      return false;
    } else {
      return true;
    }
  }

  getHeaderTextFromUrl(url: string): string {
    if (url === '/home') {
      return 'Menu de aplicaciones';
    } else if (url === '/solicitud') {
      return 'CREAR SOLICITUD';
    } else if (url === '/restaurante') {
      return 'SOLICITUD DE COMIDA';
    } else if (url === '/inactivarpermisos') {
      return 'CANCELAR SOLICITUD';
    } else {
      return ""
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'NO',
          role: 'no',
        },
        {
          text: 'SI',
          role: 'si',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === "si") {

      this.router.navigate(['/login']);
      localStorage.removeItem('nombre')


    }
  }

}
