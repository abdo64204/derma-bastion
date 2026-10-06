import { Injectable } from '@angular/core';
import { CardNetwork, PaymentReceipt } from '../models/payment.model';
import { STORE_PAYMENT_CONFIG, StorePaymentConfig } from '../config/payment.config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly config: StorePaymentConfig = STORE_PAYMENT_CONFIG;

  readonly allowedReceiptMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  readonly maxReceiptSizeBytes = 5 * 1024 * 1024; // 5 MB

  detectCardNetwork(cardNumber: string): CardNetwork {
    const clean = cardNumber.replace(/\D/g, '');

    // Meeza (Egyptian National Payment Scheme): BINs typically starting with 5078
    if (/^5078\d*/.test(clean)) {
      return 'meeza';
    }

    // Visa: starts with 4
    if (/^4\d*/.test(clean)) {
      return 'visa';
    }

    // Mastercard: starts with 51-55 or 2221-2720
    if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*/.test(clean)) {
      return 'mastercard';
    }

    return 'card';
  }

  formatCardNumberInput(input: string): string {
    const digits = input.replace(/\D/g, '').slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : digits;
  }

  formatExpiryInput(input: string): string {
    const digits = input.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  }

  validateCardNumber(cardNumber: string): boolean {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.length !== 16) {
      return false;
    }
    return this.luhnCheck(clean);
  }

  validateExpiry(expiry: string): boolean {
    const match = expiry.trim().match(/^(\d{2})\/(\d{2})$/);
    if (!match) {
      return false;
    }

    const month = parseInt(match[1], 10);
    const yearShort = parseInt(match[2], 10);

    if (month < 1 || month > 12) {
      return false;
    }

    const now = new Date();
    const currentYearShort = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1; // 1-indexed

    if (yearShort < currentYearShort) {
      return false;
    }

    if (yearShort === currentYearShort && month < currentMonth) {
      return false;
    }

    // Unreasonable future year (e.g. > 20 years)
    if (yearShort > currentYearShort + 20) {
      return false;
    }

    return true;
  }

  validateCvv(cvv: string): boolean {
    const clean = cvv.trim();
    return /^\d{3,4}$/.test(clean);
  }

  maskCardNumber(cardNumber: string): string {
    const clean = cardNumber.replace(/\D/g, '');
    const last4 = clean.slice(-4);
    return `•••• •••• •••• ${last4}`;
  }

  validateReceiptFile(file: File): { valid: boolean; errorKey?: string } {
    if (!this.allowedReceiptMimeTypes.includes(file.type)) {
      return { valid: false, errorKey: 'checkout.payment.receipt.error.invalidType' };
    }

    if (file.size > this.maxReceiptSizeBytes) {
      return { valid: false, errorKey: 'checkout.payment.receipt.error.tooLarge' };
    }

    return { valid: true };
  }

  async createReceiptFromImage(file: File): Promise<PaymentReceipt> {
    const dataUrl = await this.readFileAsDataUrl(file);

    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      dataUrl,
      uploadedAt: new Date().toISOString()
    };
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  private luhnCheck(numStr: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = numStr.length - 1; i >= 0; i--) {
      let digit = parseInt(numStr.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }
}
