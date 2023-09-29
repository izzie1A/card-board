import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { doc, onSnapshot } from "firebase/firestore";
import { CdkPortal } from '@angular/cdk/portal';
import { Task } from '../components/task';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  item$: Observable<Item[] | Task[] |any[]>;
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

}

interface Item {
  name: string,
};

