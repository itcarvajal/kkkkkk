import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  descripcionItemForm: any;
  nombreItemForm: any;
  precioItemForm: any;

  constructor(private readonly loadingCtrl: LoadingController,
    private firebase: FirebaseService,  
    private router: Router) {}


  firebaseServ = inject(FirebaseService);

  ngOnInit(){
    console.log("Bienvenido!");
    
  }
  descripcionItem: string; 
  nombreItem: string; 
  precioItem: number;



  async agregarProducto(){
    const loading = await this.loadingCtrl.create();
    let item = {
      descripcion: this.descripcionItemForm, 
      nombre: this.nombreItemForm, 
      precio: this.precioItemForm
    }
    let path = "items/" + this.descripcionItem
    this.firebase.setDocument(path, item)
      .then(
        () => {
          loading.dismiss().then(() => {
             //this.router.navigateByUrl(''); 
            console.log("Prducto Agregado");
            
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

}


  mensaje(){
    
    let email = "adoo@yopmail.com"
    let  password = "sam1210"
    
    this.firebaseServ.sigIn(email, password).then(res => {
      console.log(res);
      
    }) 
  }
}
