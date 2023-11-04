import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  auth = inject(AngularFireAuth)
  firestore = inject(AngularFirestore)


  //FireAuth
  sigIn(email: string, password: string){
    return signInWithEmailAndPassword(getAuth(), email, password);
  }


  //Firestore

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data)
  }
}
