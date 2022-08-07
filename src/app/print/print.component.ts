import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from '../models/payment.model';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
})
export class PrintComponent {
  @Input() payment!: Payment;
  @Output() closePrintEvent = new EventEmitter<boolean>();

  closePrint() {
    this.closePrintEvent.emit(true);
  }
}
