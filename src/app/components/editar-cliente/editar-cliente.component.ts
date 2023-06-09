import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cliente } from 'src/app/models/cliente.model';
import { ClienteServicio } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: cliente ={
    nombre: '',
    apellido: '',
    correo: ''
  }

  id: string = '';

  constructor(private clientesServicio: ClienteServicio, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe( cliente => {
      if (cliente !== null) {
        this.cliente = cliente;
      }
    });

  }

  guardar({value, valid}: NgForm){
    if(!valid){
      console.log('error')
    }
    else{
      value.id = this.id;
      this.clientesServicio.modificarCliente(value);  
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea elminiar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }


}
