import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() userAccount: User | any;
  @Input() recepient: User | any;
  @Output() payEvent = new EventEmitter();
  @Output() receiveEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter<boolean>();

  submitted = false;

  paymentForm = new FormGroup({
    sender: new FormControl('', Validators.required),
    senderBank: new FormControl('', Validators.required),
    semderAccNo: new FormControl('', Validators.required),

    receiver: new FormControl('', Validators.required),
    recieverAccNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    receiverBank: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.minLength(2)]),

    transactionRef: new FormControl('', Validators.required),
    transactionDate: new FormControl('', Validators.required),
    transactionStatus: new FormControl('Progress', Validators.required),
    agreement: new FormControl(false, Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { recepient } = changes;
    if (recepient.currentValue) {
      const { bank, firstName, lastName } = recepient.currentValue;
      this.paymentForm.patchValue({
        receiverBank: bank,
        receiver: firstName + ' ' + lastName,
      });
    } else {
      this.paymentForm.patchValue({ receiverBank: '', receiver: '' });
    }
  }

  searchByAccNo() {
    let index = this.paymentForm.value.recieverAccNo;
    index = index ? index : '0';
    this.receiveEvent.emit(this.paymentForm.value.recieverAccNo);
  }

  payNow() {
    this.submitted = true;
    const min = 10000000000;
    const max = 90000000000;
    const random = Math.floor(Math.random() * min) + max;

    if (this.recepient) {
      this.paymentForm.patchValue({
        sender: `${this.userAccount.firstName} ${this.userAccount.lastName}`,
        senderBank: this.userAccount.bank,
        semderAccNo: this.userAccount.accNo,
        transactionRef: random.toString(),
        transactionDate: `${new Date()}`,
        receiverBank: this.recepient.bank,
        receiver: `${this.recepient.firstName}  ${this.recepient.lastName}`,
      });
    }

    if (
      this.paymentForm.valid &&
      this.paymentForm.value.agreement !== false &&
      !this.checkBalance(this.pf['amount'].value)
    ) {
      this.payEvent.emit(this.paymentForm.value);
    }
    this.setTimout();
  }

  get pf() {
    return this.paymentForm.controls;
  }

  checkBalance(amount: any): boolean {
    return +amount > +this.userAccount.accBalance;
  }

  setTimout() {
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }

  back() {
    this.backEvent.emit(true);
  }
}
