import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonAccordionGroup } from '@ionic/angular';

import {PoliticasService} from 'src/app/services/politicas.service';

@Component({
  selector: 'app-auth-politicas',
  templateUrl: './auth-politicas.page.html',
  styleUrls: ['./auth-politicas.page.scss'],
})
export class AuthPoliticasPage implements OnInit {

  formularioCheck: FormGroup;
  arrayPoliticas:any;
  countCheck: number | undefined;
  countpolitica: number = 5;

  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;

  constructor(public fb: FormBuilder, private router: Router, public alertController: AlertController, public politicaservicio: PoliticasService) {

    this.formularioCheck = this.fb.group({
      // 'check1': new FormControl(false),
      // 'check2': new FormControl(false),
      // 'check3': new FormControl(false),
      // 'check4': new FormControl(false),

      checks: this.fb.array([])

    })
  }

  ngOnInit() {
    this.getpost();
  }


  getpost(){
    this.politicaservicio.getPoliticas().then(data=>{
      this.arrayPoliticas= data
    })
  };


   toggleAccordion = (event: any) => {
    const nativeEl = this.accordionGroup;
    nativeEl.value = event;
  };


  async verificacion() {

  

    var f = this.formularioCheck.value;

    

    if (this.countCheck === this.countpolitica) {  //TENER EN CUENTA: BUSCAR OTRA MANERA DE COMPROBAR LOS DATOS DE CADA ELEMNTO SIN QUEMARLOS
      const alert = await this.alertController.create({
        header: 'POLITICAS ACEPTADAS',
        message: 'PROCESO YA REALIZADO',
        buttons: ['Aceptar'],

      });

      await alert.present();
      this.router.navigate(['/login']);
    } 
    else{
      const alert = await this.alertController.create({
        header: '¿Desea continuar sin aceptar las politicas?',
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


        const alert = await this.alertController.create({
          header: 'RECHAZO DE LAS POLITICAS',
          message: 'No puede realizar servicios con <b> VENTURA GROUP </b>, Comuniquese con la trasportadora',
          buttons: ['OK'],
  
        });
  
        await alert.present();


        this.router.navigate(['/login']);

      }
    }

  }


  prueba(e:any){

    const checks: FormArray = this.formularioCheck.get('checks') as FormArray;

    if(e.target.checked) {
  
      checks.push(new FormControl(e.target.value));
      
    }else{
      
      let i: number=0;
      checks.controls.forEach((item: any)=>{
        if(item.value== e.target.value){
          checks.removeAt(i);
          i++
        }
      })
    }

    this.countCheck = Object.keys(checks.value).length;
  }
}


