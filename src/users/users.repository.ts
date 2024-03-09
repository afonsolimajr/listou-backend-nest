import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { User } from "./entities/user.entity";
@Injectable()
export class UserRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection("users");
  public async getAllUsers(): Promise<any> {
    const collection = await this._collectionRef.get();
    const users = collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  }
  public async getUser(id: string): Promise<any> {
    const item = await this._collectionRef.doc(id).get();
    const user = { id: item.id, ...item.data() };
    return user;
  }

  public async getUserByLogin(userName: string): Promise<any> {
    const collection = await this._collectionRef
      .where("username", "==", userName)
      .get();
    const users = collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  }

  public async createUser(
    newuser: User,
  ): Promise<{ status: string; message: string }> {
    const users = await this.getUserByLogin(newuser.username);
    if (users.length == 0) {
      const document = await this._collectionRef.add(newuser);
      console.log("adicionado", document);
      return { status: "success", message: "Usuário adicionado" };
    } else {
      return { status: "error", message: "Usuário já existe" };
    }
  }

  public async updateUser(
    user: any,
  ): Promise<{ status: string; message: string }> {
    const doc = this._collectionRef.doc(user.id);
    const updated = await doc.update(user);
    return updated
      ? { status: "success", message: "Usuário atualizado" }
      : { status: "error", message: "Usuário não foi atualizado" };
  }

  public async removeUser(userName: string): Promise<boolean> {
    const users = await this.getUserByLogin(userName);
    console.log("users", users);
    if (users && users.length > 0) {
      const user = users[0];
      const document = await this._collectionRef.doc(user.id);
      const deleted = await document.delete();
      console.log("deleted", deleted);
      return !!deleted;
    } else {
      return false;
    }
  }
}
