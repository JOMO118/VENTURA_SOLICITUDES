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

  AdcionalChange() {
    this.motivoForm.get('fechaInicio')?.enable()
    this.motivoForm.get('fechaFin')?.enable()
  }


  getMinFecha() {
    const semestreSeleccionado = this.motivoForm.value.semestre;
    return semestreSeleccionado === '2' ? '2023-07-01' : '2023-01-01';
  }

  getMaxFecha() {
    const semestreSeleccionado = this.motivoForm.value.semestre;
    return semestreSeleccionado === '2' ? '2023-12-31' : '2023-06-30';
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


  FileChange(e: any) {
    const archivos: FileList = e.files

    if (archivos && archivos.length > 0) {
      this.motivoForm.get('fechaInicio')?.enable()
      this.motivoForm.get('fechaFin')?.enable()
      for (let i = 0; i < archivos.length; i++) {
        const archivo: File = archivos[i];
        if (archivo.type === 'application/pdf' || archivo.type === 'image/png' || archivo.type === 'image/jpeg') {

          this.images.push(archivo)
          // const reader = new FileReader()

          // reader.onload = (a: any) => {
          //   const urlArchivo = window.URL.createObjectURL(archivo)
          //   console.log(urlArchivo)
          //   console.log(a.result)
          //   this.miniaturas.push(urlArchivo)
          // };
          // reader.readAsDataURL(archivo)

        } else {
          console.log(archivo.name + ' archivo invalido')
        }

      }
    } else {
      this.motivoForm.get('fechaInicio')?.disable()
      this.motivoForm.get('fechaFin')?.disable()
    }
  }

  submitForm() {
    this.validarFechas();

  }
}