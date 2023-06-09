import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';

const routes: Routes = [

  {path: '', component: BodyComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistroComponent},
  {path: "recuperar-password", component: RecuperarPasswordComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  {path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard] },
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
