import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController, IonContent, LoadingController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  @ViewChild(IonContent, { static: true })
  content!: IonContent;

  formulariouser: FormGroup;
  submit: boolean = false;
  tipo: boolean = true;

  selectuser: any;

  localname = localStorage.getItem('nombre')
  datas: any
  result: any;
  selected = [];
  ListPersona_permiso: any = [];
  grupo_select: any;
  cont_result: any;
  cont_repetidas: any

  valortipo: any;
  valorcategoria: any;
  valorapp: any;
  valorgrupo: any;

  mensaje: any;

  msj_personas: any;
  msj_grupos: any;
  msj_app: any;

  modalstate = false;

  customPopoverOptions = {
    header: 'Aplicación',
    message: 'Escoja el tipo de aplicación que se le dara permiso al usuario',
  };


  ListGrupo: any = [
    { id: 1, name: 'BGP' },
    { id: 2, name: 'GP' },
    { id: 3, name: 'OOP' },
  ];

  pruebaApi: any = [
    {
      id_tipo: 1,
      nombre_tipo: 'ERP',
      categorias: [
        {
          id_cat: 1,
          nombre_cat: 'Web',
          aplicacion: [
            {
              id_app: 1,
              nombreapp: 'Nomina',
            },
            {
              id_app: 2,
              nombreapp: 'Mantenimiento',
            },
          ],
        },
        {
          id_cat: 2,
          nombre_cat: 'Escritorio',
          aplicacion: [
            {
              id_app: 3,
              nombreapp: 'Compra',
            },
            {
              id_app: 4,
              nombreapp: 'Financiero',
            },
            {
              id_app: 5,
              nombreapp: 'Siesa-Fiscal',
            },
          ],
        },
      ],
    },
    {
      id_tipo: 2,
      nombre_tipo: 'Gestion Documental',
      categorias: [
        {
          id_cat: 3,
          nombre_cat: 'Facturas',
          aplicacion: [
            {
              id_app: 6,
              nombreapp: 'Radicación',
            },
            {
              id_app: 7,
              nombreapp: 'aprobación',
            },
            {
              id_app: 8,
              nombreapp: 'Cargue de documento',
            },
          ],
        },
        {
          id_cat: 4,
          nombre_cat: 'Documentación',
          aplicacion: [
            {
              id_app: 9,
              nombreapp: 'Radicación',
            },
            { id_app: 10, nombreapp: 'aprobación' },
          ],
        },
        {
          id_cat: 5,
          nombre_cat: 'Compra',
          aplicacion: [
            {
              id_app: 11,
              nombreapp: 'Radicación',
            },
          ],
        },
      ],
    },
  ];

  Tipocheck: any;
  Categoriacheck: any;


  constructor(public fb: FormBuilder, private router: Router, public usuariosservicios: UsuariosService,
    public alertController: AlertController, private loadingCtrl: LoadingController) {
    this.formulariouser = this.fb.group({
      'cedula': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)]),
      'nombre': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-z A-Z]+$'),]),
      'cargo': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-z A-Z]+$'),]),
      tiposchecks: this.fb.array([]),
      categoriaschecks: this.fb.array([])
    })
  }
  get errorControl() {
    return this.formulariouser.controls;
  }

  ngOnInit() {

  }

  CargaUsuarios() {
    this.usuariosservicios.getAllColaboradores().subscribe(res => {
      this.result = res
      this.datas = res
      this.loadingCtrl.dismiss()
    }, error => {
      this.loadingCtrl.dismiss()
    })
  }

  ischecked(e: any) {
    this.selectuser = e.detail.value
    this.modalstate = false
    this.result = this.datas

    if (this.datas) {
      this.resetSelect()
      this.resetGrupo()
      this.selected = []
      this.resetAll()
    }

  }

  handleChange(event: any) {

    const query = event.target.value.toLowerCase();

    this.result = this.datas.filter((filt: any) => filt.empleado_nombres.toLowerCase().indexOf(query) > -1)
    this.cont_result = this.result.length

    // let d = this.result.    

  }

  async Setopen(isOpen: boolean) {
    this.modalstate = isOpen;
    this.result = this.datas


    if (!this.datas && isOpen) {
      await this.loadingModal(0)
      this.CargaUsuarios()
    } else if (this.datas && isOpen) {
      this.loadingModal(500)
    }



  }


  seleccion() {

    this.selected = this.datas.filter((item: any) => item.selected)


  }

  delete(data1: any, data2: any) {
    this.selected.find(
      (item: any) => {
        if (item.empleado_nombres === data1 && item.empleados_apellidos === data2) {
          item.selected = false
        }
      }
    );
    console.log(this.selected.length)
    if (this.selected.length < 2) {
      this.resetGrupo()
      this.resetAll()
    }
    this.seleccion()
  }


  siguiente() {
    this.submit = true;


  }

  // FORMULARIO DE PERMISOS--------------------------------------------------------------------------------------------
  handleChangegrupo(e: any) {
    this.valorgrupo = e.detail.value
    // let value = 0
    // this.msj_grupos = ""


    // console.clear()
    // this.ListGrupo.forEach((item: any) => {
    //   if (item.grupoChecked) {
    //     value++;
    //     this.msj_grupos = this.msj_grupos + " - " + item.name
    //   }
    // })

    // if (value > 0) {
    //   this.valorgrupo = true
    // } else {
    //   this.resetAll()
    // }

  }

  handleChangetipo(e: any) {
    this.valortipo = false
    this.valorcategoria = false;
    this.valorapp = false;
    this.valortipo = e.detail.value;
    console.clear();
    console.log(e.detail.value)
  }

  handleChangecategoria(e: any) {
    this.valorapp = false;
    this.valorcategoria = e.detail.value;
    console.clear();
    console.log(e.detail.value)
  }


  handleChangeapp(e: any) {
    this.valorapp = e.detail.value;
    console.clear();
    console.log(e.detail.value)
  }

  async summit() {
    console.clear();

    // let basetipo = this.pruebaApi[this.valortipo - 1];

    // let basecategoria = basetipo.categorias.find(
    //   (item: any) => item.id_cat == this.valorcategoria
    // );

    // let baseapp = basecategoria.aplicacion.find(
    //   (item: any) => item.id_app == this.valorapp
    // );


    // if (this.selectuser == "F") {
    //   this.msj_personas = "";

    //   this.selected.forEach((item: any) => {
    //     this.msj_personas = this.msj_personas + " - " + item.name
    //   })
    // } else if (this.selectuser == "T") {
    //   var f = this.formulariouser.value
    //   this.msj_personas = f.nombre
    // }

    // let msjtipo = ' fue/fueron escogidos para el tipo ' + basetipo.nombre_tipo;
    // let msjcategoria = 'para la categoria ' + basecategoria.nombre_cat;
    // let msjgrupo = 'con el/los grupos' + this.msj_grupos

    // this.mensaje = this.msj_personas + msjtipo + '; ' + msjcategoria + '; ' + '; ' + msjgrupo
    // console.log(this.mensaje)



    const alert = await this.alertController.create({
      header: '¿Desea añadir más permisos?',
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

    if (role === "no") {

      localStorage.setItem('colaboradores', JSON.stringify(this.ListPersona_permiso))

      this.resetSelect()
      this.resetGrupo()
      this.resetAll();
      this.selectuser = undefined
      this.ListPersona_permiso = []
      this.selected = []

      const alert = await this.alertController.create({
        header: 'SOLICITUD ENVIADA',
        message: 'Su solicitud fue enviada con exito',
        buttons: ['OK'],

      });

      await alert.present();

      this.router.navigate(['/home']);



    }

  }

  load() {
    this.cont_repetidas = false;
    console.clear()

    if (this.selectuser == "F") {
      this.msj_personas = "";

      this.selected.forEach((item: any) => {
        let a = item.empleado_nombres + " " + item.empleados_apellidos

        this.CrearLista(a)
      })
    } else if (this.selectuser == "T") {
      var f = this.formulariouser.value
      this.CrearLista(f.nombre)
    }

    if (this.cont_repetidas) {
      this.alertPermiso()
    }

  }


  CrearLista(colaborador: any) {
    this.pruebaApi.forEach((itemtipo: any) => {
      itemtipo.categorias.forEach((itemcat: any) => {
        itemcat.aplicacion.forEach((itemapp: any) => {
          if (itemapp.id_app == this.valorapp) {
            this.msj_app = itemapp.nombreapp
          }
        })
      })
    })

    console.log(colaborador)
    if (!this.ListPersona_permiso.some((element: any) => element.Colaborador === colaborador && element.Aplicacion === this.msj_app && element.Empresa === this.valorgrupo)) {
      this.ListPersona_permiso.push({ Colaborador: colaborador, Aplicacion: this.msj_app, Empresa: this.valorgrupo })
    } else {
      this.cont_repetidas = true

    }
    // this.ListPersona_permiso.some((element: any) => {
    //   if (this.ListPersona_permiso.length === 0) {
    //     this.ListPersona_permiso.push({ Colaborador: colaborador, Aplicacion: this.msj_app, Empresa: this.valorgrupo })
    //     console.log("no se repite")
    //   }else if (element.Colaborador === colaborador && element.Aplicacion === this.msj_app && element.Empresa === this.valorgrupo){
    //     console.log(" se repite")
    //   }else{
    //     console.log("no se repite")
    //   }
    // });




    this.scrollbottom();

  }

  async alertPermiso() {
    const alert = await this.alertController.create({
      header: "Este permiso ya está guardado",
      buttons: ["aceptar"],
    });

    await alert.present();
  }


  deleteload(e: any) {
    console.clear()
    console.log(e)
    this.ListPersona_permiso.splice(e, 1)
  }

  resetAll() {
    this.submit = false;
    this.valorgrupo = false
    this.valortipo = false;
    this.valorcategoria = false;
    this.valorapp = false;
  }

  resetGrupo() {
    this.ListGrupo.forEach((item: any) => {
      item.grupoChecked = false;
    });
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

  CambioTipo(e: any) {

    const checks: FormArray = this.formulariouser.get('tiposchecks') as FormArray;

    if (e.target.checked) {

      checks.push(new FormControl(e.target.value));

    } else if (!e.target.checked) {

      let i: number = 0;
      checks.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checks.removeAt(i);
        }
        i++
      })
    }
    // this.countCheck = Object.keys(checks.value).length;
    this.Tipocheck = checks.value

  }

  Cambiocategoria(e: any) {

    const checks: FormArray = this.formulariouser.get('categoriaschecks') as FormArray;

    if (e.target.checked) {

      checks.push(new FormControl(e.target.value));

    } else if (!e.target.checked) {

      let i: number = 0;
      checks.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checks.removeAt(i);
        }
        i++
      })
    }
    // this.countCheck = Object.keys(checks.value).length;
    this.Categoriacheck = checks.value

    console.log(this.Categoriacheck)

  }
}
