import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollexction: AngularFirestoreCollection<IUser>;
  constructor(private auth: AngularFireAuth, private db:AngularFirestore) {
    this.usersCollexction = db.collection('user')
   }
 
public async creatUser(userData: IUser){
  if(!userData.password) {
    throw new Error("Password not provided!")    
      }
   
  const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password );

  if(!userCred.user){
throw new Error("user can't be found");
  }
  await  this.usersCollexction.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

    await userCred.user.updateProfile({
      displayName: userData.name
    })

}

}

/* fixing an database rules 

 rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
      
         
    }
  }
} */
