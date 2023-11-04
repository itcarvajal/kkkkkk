import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailForm: string;
  passwordForm: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  async iniciarSesion() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.emailForm,
        this.passwordForm
      );

      if (userCredential.user) {
        const email = userCredential.user.email;

        if (email === 'admin@admin.admin') {
          console.log('SOY ADMIN');
          this.router.navigate(['/home'])
        } else {
          console.log('No soy admin :c');
          this.router.navigate(['/home'])
        }

        return userCredential.user;
      } else {
        throw new Error('El usuario no está autenticado correctamente en Firebase.');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}





