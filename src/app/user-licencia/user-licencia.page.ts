import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-licencia',
  templateUrl: './user-licencia.page.html',
  styleUrls: ['./user-licencia.page.scss'],
})
export class UserLicenciaPage implements OnInit {
  localname = localStorage.getItem('nombre')

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

  constructor(private formBuilder: FormBuilder, public alertController: AlertController) {
    this.motivoForm = this.formBuilder.group({
      'motivo': ['', Validators.required],
      'semestre': '',
      'constancia': '',
      'fechaInicio': ['', Validators.required],
      'fechaFin': ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!this.motivoForm.value.motivo.descripcion) {
      this.motivoForm.get('fechaInicio')?.disable()
      this.motivoForm.get('fechaFin')?.disable()
    }
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

  isFechaDisabled() {
    const motivoSeleccionado = this.motivoForm.value.motivo.descripcion;
    const semestreSeleccionado = this.motivoForm.value.semestre;
    return motivoSeleccionado === 'Dia de la Familia (Ley 1857)' && semestreSeleccionado === '2';
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

    if (fechainicio > fechafin) {
      const alert = await this.alertController.create({
        header: "La fecha de inicio no puede ser mayor a la de fin",
        buttons: ["aceptar"],
        cssClass: 'alert-button-confirm',
      });

      await alert.present();
    }
  }


  FileChange(e: any) {
    const files: File = this.motivoForm.value.constancia
    console.log(files)

  }

  submitForm() {
    console.log(this.motivoForm.value.constancia)
  }
}