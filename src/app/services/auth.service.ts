import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';
import {  delay, map } from 'rxjs/operators';
import IUser from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollexction: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  constructor(
    private auth: AngularFireAuth, 
    private db:AngularFirestore,
    private router:Router) {
    this.usersCollexction = db.collection('user');
   /*  auth.user.subscribe(console.log); */
   //verify if user is authenticate or not
   
   this.isAuthenticated$ = auth.user.pipe(
      map( user => !!user)
    )

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(2000)
    )
    
    // the result is a boolean ture if user is authenticate 
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

public async logout($event?: Event){

if($event){
    $event.preventDefault();
}

  await  this.auth.signOut();
  await this.router.navigateByUrl('/');
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
