import { Component, inject, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';
import { Orders } from '../../services/orders';
import { Language } from '../../services/language';
import { PaymentService } from '../../services/payment.service';
import { CardNetwork, OrderPaymentInfo, PaymentMethodId, PaymentReceipt } from '../../models/payment.model';

interface Governorate {
  en: string;
  ar: string;
}

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  cart = inject(Cart);
  lang = inject(Language);
  paymentService = inject(PaymentService);

  private fb = inject(FormBuilder);
  private orders = inject(Orders);
  private router = inject(Router);

  private readonly governorateData: Governorate[] = [
    { en: 'Cairo', ar: 'القاهرة' },
    { en: 'Giza', ar: 'الجيزة' },
    { en: 'Alexandria', ar: 'الإسكندرية' },
    { en: 'Qalyubia', ar: 'القليوبية' },
    { en: 'Port Said', ar: 'بورسعيد' },
    { en: 'Suez', ar: 'السويس' },
    { en: 'Damietta', ar: 'دمياط' },
    { en: 'Dakahlia', ar: 'الدقهلية' },
    { en: 'Sharqia', ar: 'الشرقية' },
    { en: 'Gharbia', ar: 'الغربية' },
    { en: 'Monufia', ar: 'المنوفية' },
    { en: 'Kafr El Sheikh', ar: 'كفر الشيخ' },
    { en: 'Beheira', ar: 'البحيرة' },
    { en: 'Ismailia', ar: 'الإسماعيلية' },
    { en: 'Faiyum', ar: 'الفيوم' },
    { en: 'Beni Suef', ar: 'بني سويف' },
    { en: 'Minya', ar: 'المنيا' },
    { en: 'Assiut', ar: 'أسيوط' },
    { en: 'Sohag', ar: 'سوهاج' },
    { en: 'Qena', ar: 'قنا' },
    { en: 'Luxor', ar: 'الأقصر' },
    { en: 'Aswan', ar: 'أسوان' },
    { en: 'Red Sea', ar: 'البحر الأحمر' },
    { en: 'New Valley', ar: 'الوادي الجديد' },
    { en: 'Matrouh', ar: 'مطروح' },
    { en: 'North Sinai', ar: 'شمال سيناء' },
    { en: 'South Sinai', ar: 'جنوب سيناء' },
  ];

  readonly governorates = computed(() =>
    this.governorateData.map(g => this.lang.isArabic() ? g.ar : g.en)
  );

  readonly selectedPaymentMethod = signal<PaymentMethodId>('cod');

  readonly receipt = signal<PaymentReceipt | null>(null);
  readonly receiptError = signal<string | null>(null);

  readonly deliveryForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    governorate: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', [Validators.required, Validators.minLength(8)]],
    notes: ['']
  });

  readonly cardForm = this.fb.nonNullable.group({
    cardholderName: ['', [Validators.required, Validators.minLength(3)]],
    cardNumber: ['', [Validators.required]],
    cardExpiry: ['', [Validators.required]],
    cardCvv: ['', [Validators.required]],
  });

  readonly cardNetwork = computed<CardNetwork>(() => {
    const rawNumber = this.cardForm.get('cardNumber')?.value ?? '';
    return this.paymentService.detectCardNetwork(rawNumber);
  });

  submitted = signal(false);

  selectPaymentMethod(method: PaymentMethodId) {
    this.selectedPaymentMethod.set(method);
    this.receiptError.set(null);
  }

  onCardNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.paymentService.formatCardNumberInput(input.value);
    this.cardForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
    input.value = formatted;
  }

  onExpiryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.paymentService.formatExpiryInput(input.value);
    this.cardForm.get('cardExpiry')?.setValue(formatted, { emitEvent: false });
    input.value = formatted;
  }

  onCvvInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 4);
    this.cardForm.get('cardCvv')?.setValue(digitsOnly, { emitEvent: false });
    input.value = digitsOnly;
  }

  async onReceiptFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const validation = this.paymentService.validateReceiptFile(file);
    if (!validation.valid && validation.errorKey) {
      this.receiptError.set(validation.errorKey);
      input.value = '';
      return;
    }

    try {
      const receiptData = await this.paymentService.createReceiptFromImage(file);
      this.receipt.set(receiptData);
      this.receiptError.set(null);
    } catch {
      this.receiptError.set('checkout.payment.receipt.error.invalidType');
    }
  }

  removeReceipt(fileInput?: HTMLInputElement) {
    this.receipt.set(null);
    this.receiptError.set(null);
    if (fileInput) {
      fileInput.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  placeOrder() {
    this.submitted.set(true);

    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    const method = this.selectedPaymentMethod();

    if (method === 'card') {
      this.cardForm.markAllAsTouched();
      const rawNumber = this.cardForm.get('cardNumber')?.value ?? '';
      const expiry = this.cardForm.get('cardExpiry')?.value ?? '';
      const cvv = this.cardForm.get('cardCvv')?.value ?? '';

      const isNameValid = (this.cardForm.get('cardholderName')?.value ?? '').trim().length >= 3;
      const isNumberValid = this.paymentService.validateCardNumber(rawNumber);
      const isExpiryValid = this.paymentService.validateExpiry(expiry);
      const isCvvValid = this.paymentService.validateCvv(cvv);

      if (!isNameValid || !isNumberValid || !isExpiryValid || !isCvvValid) {
        return;
      }
    }

    if (method === 'vodafone_cash' || method === 'instapay') {
      if (!this.receipt()) {
        this.receiptError.set('checkout.payment.receipt.error.required');
        return;
      }
    }

    // Build secure order payment info (NEVER stores card numbers or CVV!)
    let paymentInfo: OrderPaymentInfo;

    if (method === 'card') {
      const rawNumber = this.cardForm.get('cardNumber')!.value;
      paymentInfo = {
        method: 'card',
        status: 'pending',
        cardNetwork: this.cardNetwork(),
        maskedCard: this.paymentService.maskCardNumber(rawNumber),
        gatewayNote: 'Pending PSP Gateway Integration (Paymob / Fawry / Kashier)'
      };
    } else if (method === 'vodafone_cash') {
      paymentInfo = {
        method: 'vodafone_cash',
        status: 'pending',
        receipt: this.receipt()!
      };
    } else if (method === 'instapay') {
      paymentInfo = {
        method: 'instapay',
        status: 'pending',
        receipt: this.receipt()!
      };
    } else {
      paymentInfo = {
        method: 'cod',
        status: 'paid_on_delivery'
      };
    }

    const order = this.orders.create(
      this.deliveryForm.getRawValue(),
      this.cart.cartItems(),
      this.cart.subtotal(),
      this.cart.shipping(),
      this.cart.total(),
      paymentInfo
    );

    this.router.navigate(['/order-success', order.id]).then(() => this.cart.clear());
  }

  showDeliveryError(name: string): boolean {
    const control = this.deliveryForm.get(name);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  showCardError(name: string): boolean {
    const control = this.cardForm.get(name);
    if (!control) {
      return false;
    }

    if (name === 'cardNumber') {
      return (control.touched || this.submitted()) && !this.paymentService.validateCardNumber(control.value);
    }
    if (name === 'cardExpiry') {
      return (control.touched || this.submitted()) && !this.paymentService.validateExpiry(control.value);
    }
    if (name === 'cardCvv') {
      return (control.touched || this.submitted()) && !this.paymentService.validateCvv(control.value);
    }

    return control.invalid && (control.touched || this.submitted());
  }
}
