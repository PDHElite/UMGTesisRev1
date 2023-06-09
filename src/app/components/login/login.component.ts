import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private firebaseError: FirebaseCodeErrorService,
    private creadorFormulario: FormBuilder,
    private spinner: NgxSpinnerService
    ){
      this.formularioLogin = this.creadorFormulario.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.loginService
        .login(this.formularioLogin.value.email, this.formularioLogin.value.password)
        .then(res => {
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.datosCorrectos = false;
          this.textoError = this.firebaseError.codeError(error.code);
          this.spinner.hide();
        });
    } else {
      this.datosCorrectos = false;
      this.textoError = 'Por favor revisa que los datos estén correctos';
    }
  }

}
