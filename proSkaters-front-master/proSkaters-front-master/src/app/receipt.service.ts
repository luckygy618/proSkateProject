import { Injectable } from '@angular/core';

import { Receipt } from './Receipt';
import { CartItem } from './CartItem';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private receipt: Receipt;
  private savedReceipt: Receipt = JSON.parse(localStorage.getItem('receipt'));

  constructor(private logger: LoggerService) {
    if (this.receiptSaved) {
      this.loadSavedReceipt();
    } else {
      this.blankReceipt();
    }
  }

  get date(): string {
    return this.receipt.formattedDate;
  }

  get items(): CartItem[] {
    const items: CartItem[] = this.receipt.items;
    return items;
  }

  get totalQuantity(): number {
    return this.receipt.totalQuantity;
  }

  get subtotal(): number {
    return this.receipt.subtotal;
  }

  get shippingHandling(): number {
    return this.receipt.shippingHandling;
  }

  get totalBeforeTax(): number {
    return this.receipt.totalBeforeTax;
  }

  get gstHst(): number {
    return this.receipt.gstHst;
  }

  get pstRstQst(): number {
    return this.receipt.pstRstQst;
  }

  get orderTotal(): number {
    return this.receipt.orderTotal;
  }

  get receiptDefined(): boolean {
    return this.receipt != undefined && this.receipt != null;
  }

  get receiptSaved(): boolean {
    return this.savedReceipt != undefined && this.savedReceipt != null;
  }

  private saveReceipt(): boolean {
    let saved: boolean = false;
    if (this.receiptDefined) {
      localStorage.setItem('receipt', JSON.stringify(this.receipt));
      saved = true;
    }
    return saved;
  }

  private loadSavedReceipt(): boolean {
    let loaded: boolean = false;
    if (this.receiptSaved) {
      this.receipt = this.savedReceipt;
      loaded = true;
    }
    return loaded;
  }

  absRound(number: number): number {
    return Math.round((Math.abs(number) + Number.EPSILON) * 100) / 100;
  }

  blankReceipt(): boolean {
    this.receipt = {
      date: null,
      day: 0,
      month: 0,
      year: 0,
      time: '',
      formattedDate: '',
      items: new Array(),
      totalQuantity: 0,
      subtotal: 0,
      shippingHandling: 0,
      totalBeforeTax: 0,
      gstHst: 0,
      pstRstQst: 0,
      orderTotal: 0,
    };
    return this.saveReceipt();
  }

  createReceipt(
    items: CartItem[],
    totalQuantity: number,
    subtotal: number,
    shippingHandling: number
  ): boolean {
    this.receipt.date = new Date();
    this.receipt.day = this.receipt.date.getDay();
    this.receipt.month = this.receipt.date.getMonth();
    this.receipt.year = this.receipt.date.getFullYear();
    this.receipt.time = this.receipt.date.toLocaleTimeString();
    this.receipt.formattedDate = this.receipt.date.toLocaleDateString();
    this.receipt.items = items;
    this.receipt.totalQuantity = totalQuantity;
    this.receipt.subtotal = subtotal;
    this.receipt.shippingHandling = shippingHandling;
    this.receipt.totalBeforeTax = this.absRound(this.subtotal + this.shippingHandling);
    this.receipt.gstHst = this.absRound(this.totalBeforeTax * 0.13);
    this.receipt.pstRstQst = this.absRound(this.totalBeforeTax * 0);
    this.receipt.orderTotal = this.absRound(
      this.subtotal + this.shippingHandling + this.gstHst + this.pstRstQst
    );
    return this.saveReceipt();
  }
}
