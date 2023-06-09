import { Component, OnInit, ViewChild, ElementRef, TemplateRef   } from '@angular/core';
import { cliente } from 'src/app/models/cliente.model';
import { ClienteServicio } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  modalRef?: BsModalRef;

  clientes!: cliente[];
  cliente: cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: undefined,
    imgUrl: '',
    telefono: 0,
  };

  constructor(private clientesServicio: ClienteServicio, private modalService: BsModalService) { 

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.clientesServicio.getClientess().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  agregar(form: NgForm){
    if (form.invalid) {
      return;
    }
    else{
      this.clientesServicio.agregarCliente(this.cliente);
      form.resetForm();
      this.modalRef?.hide();

    }
  }

  subirImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

}
