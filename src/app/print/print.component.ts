import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Payment } from '../models/payment.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
declare var require: any;
const htmlToPdfmake = require('html-to-pdfmake');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent {
  @Input() payment!: Payment;
  @Output() closePrintEvent = new EventEmitter<boolean>();

  closePrint() {
    this.closePrintEvent.emit(true);
  }

  @ViewChild('downloadTable')
  pdfDownload!: ElementRef;

  public downloadAsPDF() {
    const pdfDownload = this.pdfDownload.nativeElement;
    var html = htmlToPdfmake(pdfDownload.innerHTML);
    const documentDefinition = { content: html };
    pdfMake
      .createPdf(documentDefinition)
      .download(
        'Transaction-receipt-' + this.payment.transactionRef.toString()
      );
  }
}
