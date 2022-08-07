import { Payment } from './../models/payment.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private firestore: AngularFirestore) {}

  payment(sender: User, receiver: User, payment: Payment) {
    payment.transactionStatus = 'Success';

    const senderRef = this.firestore.doc(`users/${sender.userId}`);

    senderRef.get().subscribe((data) => {
      // if user does not exist create the  new user
      if (data.exists) {
        const createAt = new Date();
        try {
          senderRef.set(sender);
        } catch ({ e }) {
          console.error('error creating user: ' + e);
        }
      }
    });

    const receiverRef = this.firestore.doc(`users/${receiver.userId}`);

    receiverRef.get().subscribe((data) => {
      // if user does not exist create the  new user
      if (data.exists) {
        try {
          receiverRef.set(receiver);
        } catch ({ e }) {
          console.error('error creating user: ' + e);
        }
      }
    });

    const paymentRef = this.firestore.doc(`payments/${payment.transactionRef}`);

    paymentRef.get().subscribe((data) => {
      // if user does not exist create the  new user
      if (!data.exists) {
        try {
          paymentRef.set(payment);
        } catch ({ e }) {
          console.error('error creating user: ' + e);
        }
      }
    });
  }

  //get all the payments

  getAllPayments() {
    return this.firestore.collection<Payment>('payments').valueChanges();
  }
}
