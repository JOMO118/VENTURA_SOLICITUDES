import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {

  @ViewChild(IonContent, { static: true })
  content!: IonContent;

  localname = localStorage.getItem('nombre')
  today: any
  select_day: any
  state_button: boolean = true;
  customPickerOption: any;

  listPedido: any = []

  formularioRestaurante: FormGroup;

  ubicaciones = [
    'ALM-Mantenimiento',
    'ALM-Operaciones',
    'COS-Compras',
    'COS-Contabilidad',
    'COS-Gerencia',
    'COS-Operaciones',
    'COS-Planeacion',
    'COS-Recursos humanos',
    'COS-TI',
    'M13-Bomberos',
    'M13-CCTV',
    'M13-DIAN',
    'M13-Operaciones',
    'M13-Radicacion',
    'M13-SST',
    'M13-Subestacion',
    'Opp-Almacen',
    'OPP-Auditoria',
    'Opp-Calidad',
    'Opp-CCTV',
    'Opp-Contenedor',
    'Opp-Control Operativo',
    'Opp-Equipo Movil',
    'Opp-Infraestructura',
    'Opp-Mercancias',
    'Opp-Operaciones',
    'Opp-Recepcion',
    'Opp-Recursos humanos',
    'Opp-Silos y Bodegas',
    'Opp-SST',
    'Opp-Subestacion',
    'Opp-Taller Mantenimiento',
    'Opp-TI',
    'Opp-TorredeControl',
    'ZFR-Operaciones',
    'ZL-Oficina',
    'ZOL-Almacen',
    'ZOL-Enturnamiento',
    'ZOL-Mantenimiento',
    'ZOL-OficnaBGP',
  ]

  constructor(public fb: FormBuilder, public alertController: AlertController) {
    this.formularioRestaurante = this.fb.group({
      'cantidad': new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      'sitio': new FormControl(null, [Validators.required]),

    })
  }

  get errorControl() {
    return this.formularioRestaurante.controls;
  }


  ngOnInit() {
    this.getDate()
    let list = localStorage.getItem('Pedidos')!
    this.listPedido = JSON.parse(list)
    if (!this.listPedido) {
      this.listPedido = []
    }
  }

  getDate() {
    const date = new Date();

    // if (date.getHours() < 10) {
    this.today = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + ('0' + date.getDate()).slice(-2);
    // } else {
    //   this.today = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + ('0' + (date.getDate() + 1)).slice(-2);
    // }

    console.clear();
    //  setInterval(()=>{
    //   console.log(Date.now())
    //  },1000) 
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay !== 0 //&& utcDay !== 6;
  };

  valor_fecha() {
    console.clear()


    if (this.errorControl['cantidad'].errors || this.errorControl['sitio'].errors || !this.select_day) {
      this.state_button = true
    } else {
      this.state_button = false
    }
    //this.alertContinued()

  }

  addPedido() {
    console.clear()
    let date = new Date(this.select_day)
    let value = { Fecha: date.toLocaleDateString('en-US'), Cantidad: this.formularioRestaurante.value.cantidad, Sitio: this.formularioRestaurante.value.sitio };


    if (!this.listPedido.some((arr: any) => arr.Fecha === value.Fecha && arr.Sitio === value.Sitio)) {
      this.listPedido.push(value)
      this.scrollbottom()
    } else {
      this.alertExiste()
    }


  }

  async save_date() {
    const alert = await this.alertController.create({
      header: '¿Desea enviar este pedido?',
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
      console.log(this.listPedido)
      localStorage.setItem('Pedidos', JSON.stringify(this.listPedido))

      const alert = await this.alertController.create({
        header: 'SOLICITUD ENVIADA',
        message: 'Su solicitud fue enviada con exito',
        buttons: ['OK'],
      });

      await alert.present();



    }
  }

  delete_date(e: any) {
    this.listPedido.splice(e, 1)
  }

  async alertExiste() {
    const alert = await this.alertController.create({
      header: "Este pedido ya existe",
      buttons: ["aceptar"],
    });

    await alert.present();
  }

  scrollbottom() {
    setTimeout(() => {
      this.content.scrollToBottom(500);
    }, 100);
  }



}
