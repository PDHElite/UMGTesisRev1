import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'

//Componentes
import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { BodyComponent } from './components/body/body.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';

//Firebase
import { environment } from 'src/environments/environment.development';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';

//Servicios
import { ClienteServicio } from './services/cliente.service';
import { LoginService } from './services/login.service';
import { FirebaseCodeErrorService } from './services/firebase-code-error.service';
import { MensajesService } from './services/mensajes.service';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    BodyComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    NotFoundComponent,
    FooterComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(), 
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    AuthGuard,
    ClienteServicio,
    LoginService, 
    FirebaseCodeErrorService,
    MensajesService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
