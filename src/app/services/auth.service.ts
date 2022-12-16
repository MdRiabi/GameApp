import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db:AngularFirestore) { }
public async creatUser(userData){
  
  const userCred = await this.auth.createUserWithEmailAndPassword(userData.email   , userData.password );
  await  this.db.collection('user').add({
      name: userData.value,
      email: userData.value,
      age: userData.value,
      phoneNumber: userData.value,
    })

}

}
