import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from "src/app/services/auth.service";
import { Firestore, collectionData, collection, query, limit } from '@angular/fire/firestore';
import { FirebaseControlService, tItem } from "src/app/services/firebase-control.service";
// import { faker } from '@faker-js/faker';
import { MatDialog } from '@angular/material/dialog';
// import { ItemCardDialogComponent, TaskDialogResult } from './../../components/item-card-dialog/item-card-dialog.component';
import { TaskDialogResult, TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';


@Component({
  selector: 'app-item-card-list',
  templateUrl: './item-card-list.component.html',
  styleUrls: ['./item-card-list.component.css']
})
export class ItemCardListComponent {
  @Input() address: string = 'undefinded';
  @Input() collection: any;

  firestore: Firestore = inject(Firestore);

  item$: Observable<any[]> | undefined;
  itemArray: any = [];

  collectionArray: any = [];
  user: any;
  itemCardMode: 'view' | 'viewDetail' | 'edit' | 'keyValue' = 'view';

  constructor(private fbS: FirebaseControlService, private afs: AuthService, public dialog: MatDialog) {
    this.address = 'citiesloreamCollection';
    // this.item$ = collectionData(collection(this.firestore, this.address));日
    // this.item$ = this.fbS.getCollection(this.address);

    this.collectionArray.push(new ItemCardListItem('Home', 'loreamFolder/' + 'personalFolder/' + this.afs.getUserID()));
    this.collectionArray.push(new ItemCardListItem('Home', 'cities'));
    this.collectionArray.push(new ItemCardListItem('test', 'test'));
    this.collectionArray.push(new ItemCardListItem('loreamCollection', 'citiesloreamCollection'));

    this.initialize();
  }
  async initialize() {
    let x = await this.fbS.queryCondition(this.address, 10, "name", "!=", 'null');
    console.log(x);
    this.itemArray = x;
  }

  test() {
    // this.newTask();
    this.dialog.open(TaskDialogComponent);
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        // this.todo.push(result.task);
        alert();
      });
  }

  createEmpty() {
    // let fakerUid = faker.datatype.uuid();
    // let imgUrl = 'https://picsum.photos/200/300'
    // let price = faker.commerce.price()

    // let emptyObj = {
    //   createTime: Date.now(),
    //   id: fakerUid,
    //   name: faker.commerce.productName(),
    //   description: faker.commerce.productDescription(),
    //   price: price,
    //   fileArray: [],
    //   tagArray: [price, faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productMaterial()],
    //   imageArray: [imgUrl],
    //   posterImage: imgUrl,
    // }
    // this.fbS.createDoc(this.address, emptyObj.id, emptyObj);
  }

  switchCollection(address: string) {
    this.address = address;
    const itemCollection = collection(this.firestore, this.address);
    this.item$ = collectionData(itemCollection);
  }
  switchViewmode() {
    this.itemCardMode == 'viewDetail' ? this.itemCardMode = 'view' : this.itemCardMode = 'viewDetail';
  }

}

interface firebaseObj {
  image: string;
  imageArray: string[];
  file: string;
  description: string;
  save(a: string): void;
}
interface file {

}

class tes implements file {
  id: string = '';
  name: string = '';
  createTime: number;
  constructor(id: string, name: string) {
    this.createTime = Date.now();
    this.name = name;
    this.id = id;
  }
  save() { }
}

class ItemCardListItem {
  displayName: string = '';
  address: string = '';
  constructor(
    displayName: string,
    address: string,
  ) {
    this.address = address;
    this.displayName = displayName;
  }
}