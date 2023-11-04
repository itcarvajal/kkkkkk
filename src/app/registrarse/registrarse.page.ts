import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  constructor(
    private readonly loadingCtrl: LoadingController,
    private firebase: FirebaseService,
    private afAuth: AngularFireAuth, // Inyecta AngularFireAuth
    private router: Router
  ) {}

  ngOnInit() {}

  edadForm: string;
  emailForm: string;
  nombreUsuarioForm: string;
  passwordForm: string;
  telefonoForm: string;

  async registrarUsuario() {
    const loading = await this.loadingCtrl.create();
    try {
      const { emailForm, passwordForm } = this;
      await this.afAuth.createUserWithEmailAndPassword(emailForm, passwordForm); // Registra al usuario en Firebase Authentication

      let usuario = {
        edad: this.edadForm,
        email: this.emailForm,
        nombreUsuario: this.nombreUsuarioForm,
        password: this.passwordForm,
        telefono: this.telefonoForm,
      };

      let path = "usuarios/" + this.emailForm;
      await this.firebase.setDocument(path, usuario); // Almacena información adicional en Firestore

      loading.dismiss().then(() => {
        console.log("Usuario creado y registrado en Firestore.");
        // Redirige al usuario a la página deseada
        // this.router.navigateByUrl('');
      });
    } catch (error) {
      loading.dismiss().then(() => {
        console.error(error);
      });
    }
  }
}
