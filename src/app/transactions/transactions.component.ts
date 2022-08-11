import { Payment } from './../models/payment.model';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  payments: Payment[] = [];
  payment!: Payment;
  userAccount!: User;
  loading = true;
  isPrinting = false;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userrdata = this.authService.getUser();
    if (userrdata) {
      this.authService.getUserAccount(userrdata.uid).subscribe((data) => {
        if (!data) return;
        this.userAccount = data;
        this.getPayments();
      });
    }
  }

  getPayments() {
    const { accNo } = this.userAccount;
    this.paymentService.getAllPayments().subscribe(
      (payments) => {
        this.loading = !this.loading;

        this.payments = payments.filter(
          (payment) =>
            payment.recieverAccNo === accNo || payment.semderAccNo === accNo
        );
      },
      (err) => {
        this.loading = !this.loading;
      }
    );
  }

  printTransaction(payment: Payment) {
    this.payment = payment;
    this.closePrint();
  }

  closePrint() {
    this.isPrinting = !this.isPrinting;
  }
}
