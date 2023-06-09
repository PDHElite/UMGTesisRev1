import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent  implements OnInit  {

  registrarUsuario: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = '';

  constructor(
    
    private router: Router,
    private loginService: LoginService,
    private firebaseError: FirebaseCodeErrorService,
    private creadorFormulario: FormBuilder,
    private spinner: NgxSpinnerService) { 

      this.registrarUsuario = this.creadorFormulario.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repetirPassword: ['', Validators.required],
      }, { validator: this.confirmarPassword });

    }

  ngOnInit() {

    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })

  }

  confirmarPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const repetirPassword = formGroup.get('repetirPassword')?.value;
  
    if (password !== repetirPassword) {
      formGroup.get('repetirPassword')?.setErrors({ noCoincide: true });
    } else {
      formGroup.get('repetirPassword')?.setErrors(null);
    }
  }


  registro() {
    if (this.registrarUsuario.valid) {
      if (this.registrarUsuario.hasError('noCoincide', ['repetirPassword'])) {
        this.datosCorrectos = false;
        this.textoError = 'Las contraseñas ingresadas deben ser iguales';
      } else {
        this.datosCorrectos = true;
        this.spinner.show();
        this.loginService
          .registrarse(this.registrarUsuario.value.email, this.registrarUsuario.value.password)
          .then(res => {
            this.router.navigate(['/']);
          })
          .catch(error => {
            this.datosCorrectos = false;
            this.textoError = this.firebaseError.codeError(error.code);
            this.spinner.hide();
          });
      }
    } else {
      this.datosCorrectos = false;
      this.textoError = 'Por favor revisa que los datos estén correctos';
    }
  }

}
