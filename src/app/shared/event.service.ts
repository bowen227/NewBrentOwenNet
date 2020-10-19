import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EventModel } from '../apps/events-app/eventModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  postCollection: AngularFirestoreCollection<EventModel>;
  events: AngularFirestoreDocument<EventModel>;
  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('events', ref =>
    ref.orderBy('date', 'desc'));

    this.afAuth.authState.subscribe(data => this.authState = data);
   }

   public getEvents(user: string) {
    this.events = this.afs.doc<EventModel>(`events/${user}`);
    return this.events.valueChanges();
   }
}
