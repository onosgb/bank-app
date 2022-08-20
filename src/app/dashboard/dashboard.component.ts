import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userAccount: User | any;
  isPaying: boolean = false;
  recepient: User | any;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const userrdata = this.authService.getUser();
    if (userrdata) {
      this.authService.getUserAccount(userrdata.uid).subscribe(
        (data) => {
          this.isLoading = false;

          if (!data) return;
          this.userAccount = data;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
  }

  makePayment() {
    this.isPaying = true;
  }

  receiverPayment(accNo: any) {
    this.authService.getUsers().subscribe((users) => {
      this.recepient = users.find(
        (user) => user.accNo === accNo && accNo !== this.userAccount.accNo
      );
    });
  }

  payNow(payment: any) {
    this.userAccount.accBalance -= +payment.amount;
    this.recepient.accBalance += +payment.amount;
    delete payment.password;
    this.paymentService.payment(this.userAccount, this.recepient, payment);
    this.isPaying = false;
  }
}
