import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
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
}
