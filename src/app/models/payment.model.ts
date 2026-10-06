export type PaymentMethodId = 'cod' | 'card' | 'vodafone_cash' | 'instapay';

export type CardNetwork = 'visa' | 'mastercard' | 'meeza' | 'card';

export interface PaymentReceipt {
  fileName: string;
  fileSize: number;
  fileType: string;
  dataUrl?: string;
  uploadedAt: string;
}

export interface OrderPaymentInfo {
  method: PaymentMethodId;
  status: 'pending' | 'verified' | 'paid_on_delivery';
  cardNetwork?: CardNetwork;
  maskedCard?: string;
  receipt?: PaymentReceipt;
  gatewayNote?: string;
}
