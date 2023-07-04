import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user-licencia',
  templateUrl: './user-licencia.page.html',
  styleUrls: ['./user-licencia.page.scss'],
})
export class UserLicenciaPage implements OnInit {
  localname = localStorage.getItem('nombre')
  user: any = localStorage.getItem('user')
  Datauser: any

  images: File[] = [];
  thumbnails: SafeResourceUrl[] = []
  miniaturas: any[] = [];


  disabledDates: Date[];
  semestres = [
    { nombre: '1', min: '01-01', max: '06-30' },
    { nombre: '2', min: '07-01', max: '12-31' }
  ]


  motivos = [
    { constancia: false, descripcion: "Permiso dia de cumpleaños" },
    { constancia: false, descripcion: "Enfermedad en el lugar de trabajo" },
    { constancia: true, descripcion: "Cita médica programada" },
    { constancia: true, descripcion: "Calamidad doméstica" },
    { constancia: false, descripcion: "Permiso personal" },
    { constancia: false, descripcion: "Dia de la Familia (Ley 1857)" },
    { constancia: true, descripcion: "Por ser jurado de votación" },

  ];

  motivoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public alertController: AlertController, private sanitizer: DomSanitizer, public usuariosservicios: UsuariosService) {
    this.motivoForm = this.formBuilder.group({
      'motivo': ['', Validators.required],
      'semestre': '',
      'constancia': [''],
      'fechaInicio': ['', Validators.required],
      'fechaFin': ['', Validators.required],
    });

    this.disabledDates = [];
  }

  ngOnInit() {
    if (!this.motivoForm.value.motivo.descripcion) {
      this.motivoForm.get('fechaInicio')?.disable()
      this.motivoForm.get('fechaFin')?.disable()
    }

    this.datos()

  }

  async datos() {
    await this.usuariosservicios.getDataUser(this.user).subscribe(res => {
      this.Datauser = res
    })
  }


  onMotivoChange() {
    const motivoSeleccionado = this.motivoForm.value.motivo.descripcion;
    const requiereConstancia = this.motivoForm.value.motivo.constancia;

    this.motivoForm.get('semestre')?.reset()

    if (motivoSeleccionado === "Dia de la Familia (Ley 1857)" || requiereConstancia) {
      this.motivoForm.get('fechaInicio')?.disable()
      this.motivoForm.get('fechaFin')?.disable()
    } else {
      this.motivoForm.get('fechaInicio')?.reset()
      this.motivoForm.get('fechaInicio')?.enable()
      this.motivoForm.get('fechaFin')?.reset()
      this.motivoForm.get('fechaFin')?.enable()
    }
  }

  AdicionalChange() {
    this.motivoForm.get('fechaInicio')?.enable()
    this.motivoForm.get('fechaFin')?.enable()

  }


  getMinFecha() {
    const semestreSeleccionado = this.motivoForm.value.semestre;
    // return semestreSeleccionado === '2' ? '2023-07-01' : '2023-01-01';
    const yearActual = new Date().getFullYear();
    const minFecha = `${yearActual}-${semestreSeleccionado === '2' ? '07-01' : '01-01'}`;
    return semestreSeleccionado ? minFecha : `${yearActual}-01-01`

  }

  getMaxFecha() {
    const semestreSeleccionado = this.motivoForm.value.semestre;
    // return semestreSeleccionado === '2' ? '2023-12-31' : '2023-06-30'; 
    const yearActual = new Date().getFullYear();
    const maxFecha = `${yearActual}-${semestreSeleccionado === '2' ? '12-31' : '06-30'}`;
    return semestreSeleccionado ? maxFecha : `${yearActual}-12-31`

  }

  async validarFechas() {

    const fechainicio = new Date(this.motivoForm.value.fechaInicio);
    const fechafin = new Date(this.motivoForm.value.fechaFin);

    if (fechainicio >= fechafin) {
      const alert = await this.alertController.create({
        header: "La fecha de inicio no puede ser mayor a la de fin",
        buttons: ["aceptar"],
        cssClass: 'alert-button-confirm',
      });

      await alert.present();
    }
  }


  async FileChange(e: any) {
    const archivos: FileList = e.files

    if (archivos && archivos.length > 0) {
      this.motivoForm.get('fechaInicio')?.enable()
      this.motivoForm.get('fechaFin')?.enable()
      for (let i = 0; i < archivos.length; i++) {
        const archivo: File = archivos[i];
        if (archivo.type === 'application/pdf' || archivo.type === 'image/png' || archivo.type === 'image/jpeg') {

          if (!this.images.some(item => item.name === archivo.name)) {
            this.images.push(archivo)

            // const reader = new FileReader()

            // reader.onload = (event: any) => {
            //   const urlArchivo = event.target.result;
            //   this.miniaturas.push(urlArchivo);
            // };
            // reader.readAsDataURL(archivo)

          } else {
            const alert = await this.alertController.create({
              header: `${archivo.name} ya existe`,
              buttons: ["aceptar"],
              cssClass: 'alert-button-confirm',
            });

            await alert.present();
          }


        } else {
          const alert = await this.alertController.create({
            header: `${archivo.name} es un archivo invalido`,
            buttons: ["aceptar"],
            cssClass: 'alert-button-confirm',
          });

          await alert.present();
        }

      }
    } else {
      this.motivoForm.get('fechaInicio')?.disable()
      this.motivoForm.get('fechaFin')?.disable()
    }
    console.log(this.images)
  }

  eliminarDocumento(index: number) {
    this.images.splice(index, 1)
  }

  submitForm() {
    this.validarFechas();

  }
}