import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Firestore, collectionData, collection, updateDoc, getDocFromCache, deleteDoc } from '@angular/fire/firestore';
import { addDoc, doc, getCountFromServer, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
// import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage, getStorage, provideStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';


import { Task } from '../components/task';
import { TaskComponent } from '../components/task/task.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  item$: Observable<Item[] | Task[] | any[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData(itemCollection);

    let xs = collectionData(collection(this.firestore, 'todo')) as Observable<Task[]>;
    // let xs = collectionData(collection(this.firestore,'inProgress')) as Observable<Task[]>;
    // let xs = collectionData(collection(this.firestore,'done')) as Observable<Task[]>;
    // let todo = this.firestore.collection('todo').valueChanges({ idField: 'i d' }) as Observable<Task[]>;
    // let inProgress = this.firestore.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // let done = this.firestore.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

  }

  g(address: string) {
    const itemCollection = collection(this.firestore, address);
    let x = collectionData(itemCollection) as Observable<Task[]>;
    return collectionData(collection(this.firestore, address)) as Observable<Task[]>;
  }

  getCollectionValueChange(address: string) {
    // let todo = this.firestore.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // let inProgress = this.firestore.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // let done = this.firestore.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // const collection =  collection(this.firestore, 'address');

    const itemCollection = collection(this.firestore, address);
    return collectionData(itemCollection) as Observable<Task[]>
  }

  async addNullDoc(address: string) {
    const coll = collection(this.firestore, address);
    const snapshot = await getCountFromServer(coll);
    let x = snapshot.data().count.toString();
    
    let content: Task = {
      id: 'undefinded',
      title: x + 'undefindedTitle',
      description: x + 'undefindeddescription',
      name: x + 'undefindedName'
    }

    const docRef = await addDoc(collection(this.firestore,address), content);
    // console.log("created Document written with ID: ", docRef.id, content);
    content.id = docRef.id.toString();
    const docReff = doc(this.firestore, address, docRef.id);
    await updateDoc(docReff, {id:docRef.id.toString()});
  }

  async docSave(address: string, id: string, content: any) {
    const docSnap = await getDoc(doc(this.firestore, address, id));
    if (docSnap.exists()) {
      console.log("Document data exist:", docSnap.data());
      this.updateDoc(address, id, content)
    } else {
      console.log("No such document! new create");
      // const docRef = await addDoc(collection(this.firestore, address), content);
      const docRef = await setDoc(doc(this.firestore, address, id), content);
      console.log("Document written with ID: ", docRef);
    }
  }

  async createDoc(address: string, id: string, content: any) {
    console.log('created', content)
    return await setDoc(doc(this.firestore, address, id), content);
  }
  async readDoc(address: string, id: string) {
    const docRef = doc(this.firestore, address, id);
    try {
      const doc = await getDocFromCache(docRef);
      console.log("Cached document data:", doc.data());
      return doc
    } catch (e) {
      console.log("Error getting cached document:", e);
      return e
    }
  }
  async updateDoc(address: string, id: string, content: any) {
    const docRef = doc(this.firestore, address, id);
    await updateDoc(docRef, content);
  }
  async deleteDoc(address: string, id: string) {
    console.log(address, id);
    return await deleteDoc(doc(this.firestore, address, id.toString()));
  }
}

interface Item {
  name: string,
};

