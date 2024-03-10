import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { Lista } from "./entities/lista.entity";
@Injectable()
export class ListaRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection("listas");
  public async getAll(): Promise<any> {
    const collection = await this._collectionRef.get();
    const listas = collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return listas;
  }
  public async get(id: string): Promise<any> {
    const item = await this._collectionRef.doc(id).get();
    const lista = { id: item.id, ...item.data() };
    return lista;
  }

  public async create(
    lista: Lista,
  ): Promise<{ status: string; message: string }> {
    const listas = await this.get(lista.id);
    if (listas.length == 0) {
      const document = await this._collectionRef.add(lista);
      console.log("adicionado", document);
      return { status: "success", message: "Lista adicionada" };
    } else {
      return { status: "error", message: "Lista já existe" };
    }
  }

  public async update(
    lista: any,
  ): Promise<{ status: string; message: string }> {
    const doc = this._collectionRef.doc(lista.id);
    const updated = await doc.update(lista);
    return updated
      ? { status: "success", message: "Lista atualizada" }
      : { status: "error", message: "Lista não foi atualizada" };
  }

  public async remove(id: string): Promise<boolean> {
    const listas = await this.get(id);
    console.log("listas", listas);
    if (listas && listas.length > 0) {
      const lista = listas[0];
      const document = await this._collectionRef.doc(lista.id);
      const deleted = await document.delete();
      console.log("deleted", deleted);
      return !!deleted;
    } else {
      return false;
    }
  }
}
