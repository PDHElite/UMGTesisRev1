import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { cliente } from '../models/cliente.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class ClienteServicio{
    clientesColeccion!: AngularFirestoreCollection<cliente>;
    clienteDoc!: AngularFirestoreDocument<cliente>;
    clientes!: Observable<cliente[]>;
    cliente!: Observable<cliente>;

    constructor(private db: AngularFirestore){
        this.clientesColeccion = db.collection('Clientes', ref => ref.orderBy ('nombre', 'asc'))
    }

    getClientess(): Observable<cliente[]>{

        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map( accion => {
                    const datos = accion.payload.doc.data() as cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    
    }

    agregarCliente(cliente: cliente){
        this.clientesColeccion.add(cliente);
    }

    getCliente(id: string): Observable<cliente | null> {
        this.clienteDoc = this.db.doc<cliente>(`Clientes/${id}`);
        return this.clienteDoc.snapshotChanges().pipe(
            map(accion => {
                if (accion.payload.exists === false) {
                    return null;
                } else {
                    const datos = accion.payload.data() as cliente;
                    datos.id = accion.payload.id;
                    return datos;
                }
            })
        );
    }

    modificarCliente(cliente: cliente){
        this.clienteDoc = this.db.doc(`Clientes/${cliente.id}`);
        this.clienteDoc.update(cliente);
    }

    eliminarCliente(cliente: cliente){
        this.clienteDoc = this.db.doc(`Clientes/${cliente.id}`);
        this.clienteDoc.delete();
    }
    
}