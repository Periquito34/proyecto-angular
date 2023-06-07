import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  loading: boolean=false
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(){
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    
  }

}
