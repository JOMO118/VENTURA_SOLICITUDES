import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, LoadingController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactivarpermisos',
  templateUrl: './inactivarpermisos.page.html',
  styleUrls: ['./inactivarpermisos.page.scss'],
})
export class InactivarpermisosPage implements OnInit {

  @ViewChild(IonContent, { static: true })
  content!: IonContent;

  tipo: boolean = true;

  selectuser: any;

  localname = localStorage.getItem('nombre')
  datas: any
  result: any;
  selected = [];
  ListPersona_permiso: any = []
  listPersona_nueva: any = []
  grupo_select: any;
  cont_result: any;
  colaboradores: any


  modalstate = false;

  constructor(private loadingCtrl: LoadingController, public usuariosservicios: UsuariosService,
    public alertController: AlertController, private router: Router) { }

  ngOnInit() {

    this.colaboradores = localStorage.getItem('colaboradores')
    this.result = JSON.parse(this.colaboradores)
    this.datas = JSON.parse(this.colaboradores)
    console.log(JSON.parse(this.colaboradores))
  }

  CargaUsuarios() {
    // this.usuariosservicios.getAllColaboradores().subscribe(res => {
    this.loadingCtrl.dismiss()

    // })
  }


  handleChange(event: any) {

    const query = event.target.value.toLowerCase();

    this.result = this.datas.filter((filt: any) => filt.Colaborador.toLowerCase().indexOf(query) > -1)
    this.cont_result = this.result.length

  }

  Setopen(isOpen: boolean) {
    this.cont_result = 1
    this.modalstate = isOpen;

    if (!this.datas && isOpen) {
      this.loadingModal(0)
      this.CargaUsuarios()
    } else if (this.datas && isOpen) {
      this.loadingModal(1000)
    }

    this.result = this.datas

  }


  seleccion() {
    this.selected = this.datas.filter((item: any) => item.selected)
  }

  delete(dataC: any, dataA: any, dataE: any) {
    this.selected.find(
      (item: any) => {
        if (item.Colaborador === dataC && item.Aplicacion === dataA && item.Empresa === dataE) {
          item.selected = false
        }
      }
    );

    this.seleccion()
  }



  async summit() {
    console.clear();


    const alert = await this.alertController.create({
      header: '¿Desea eliminar estos permisos?',
      cssClass: 'custom-alert',

      buttons: [
        {
          text: 'NO',
          role: 'no',
          cssClass: 'alert-button-cancel',

        },
        {
          text: 'SI',
          role: 'si',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === "si") {

      let list = JSON.parse(this.colaboradores)

      this.selected.forEach((res: any) => {

        let i = null



        i = list.findIndex((item: any) => item.Colaborador === res.Colaborador && item.Aplicacion === res.Aplicacion && item.Empresa === res.Empresa)
        console.log(i)
        list.splice(i, 1)

        // list.find((item:any)=>{
        //   if(res.Colaborador === item.colaborador){
        //     console.log("ok")
        //   }
        // })
        this.listPersona_nueva = list;
      })

      this.resetSelect()
      this.selectuser = undefined
      this.ListPersona_permiso = []
      this.selected = []


      const alert = await this.alertController.create({
        header: 'SOLICITUD ENVIADA',
        message: 'SE HA BORRADO LOS PERMISOS',
        buttons: ['OK'],

      });

      await alert.present();
      localStorage.removeItem('colaboradores')
      localStorage.setItem('colaboradores', JSON.stringify(this.listPersona_nueva))
      this.router.navigate(['/home']);


    }

  }

  load() {

  }








  resetSelect() {
    this.datas.forEach((item: any) => {
      item.selected = false;
    });
  }

  async loadingModal(time: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: time
    });

    loading.present();
  }


  scrollbottom() {
    setTimeout(() => {
      this.content.scrollToBottom(500);
    }, 100);
  }


}
