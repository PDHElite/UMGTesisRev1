import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error.ts';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string) {

    switch (code) {
      // El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';
      //Contraseña muy debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';
      //Correo Electronico Invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';
      // Contraseña Incorrecta
      case FirebaseCodeErrorEnum.WrogPassword:
        return 'Contraseña incorrecta';
      // El usuario no existe 
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Este usuario no existe';
      default:
        return 'Error desconocido';
    }

  }

}