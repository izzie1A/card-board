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

    let x = this.firestore
  }

  getCollectionValueChange(address: string) {
    // let todo = this.firestore.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // let inProgress = this.firestore.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // let done = this.firestore.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // const collection =  collection(this.firestore, 'address');

    const itemCollection = collection(this.firestore, address);
    return collectionData(itemCollection) as Observable<Task[]>
  }

  getSnapshot() {
    const unsub = onSnapshot(doc(this.firestore, "cities", "SF"), (doc) => {
      console.log("Current data: ", doc.data());
    });
  }

  async docSave(address: string, id: string, content: any) {
    console.log(address, id, content)
    const docSnap = await getDoc(doc(this.firestore, address, id));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.updateDoc(address, id, content)
    } else {
      console.log("No such document! new create");
      const docRef = await addDoc(collection(this.firestore, address), content);
      console.log("Document written with ID: ", docRef.id);
    }
  }
  async addNullDoc(address: string) {

    const coll = collection(this.firestore, address);
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);

    let content: Task = {
      id: snapshot.data().count,
      title: 'undefindedTitle',
      description: 'undefindeddescription',
      name: 'undefindedName'
    }

    console.log('created', content)
    return await setDoc(doc(this.firestore, address, content.id.toString()), content);
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

