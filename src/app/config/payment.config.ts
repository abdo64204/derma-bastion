/**
 * Store Owner Payment Configuration
 *
 * IMPORTANT FOR STORE OWNER BEFORE LAUNCH:
 * The following values are placeholders. Before going live in production,
 * replace the placeholder values below with your verified business credentials:
 *
 * 1. Vodafone Cash:
 *    - `walletNumber`: The Egyptian mobile number registered for your business Vodafone Cash wallet.
 *    - `merchantName`: The business name shown to customers on wallet confirmation.
 *
 * 2. InstaPay:
 *    - `identifier`: Your registered InstaPay Payment Address (IPA) (e.g. yourstore@instapay) or IBAN.
 *    - `accountName`: The registered account name matching the IPA.
 *
 * 3. Card Payment Gateway (Paymob / Fawry / Kashier):
 *    - Card transactions require connecting a certified Payment Service Provider (PSP).
 *    - Required backend credentials: API Key, Merchant ID, HMAC Secret, and 3D Secure redirect URL.
 */

export interface StorePaymentConfig {
  vodafoneCash: {
    walletNumber: string;
    merchantName: string;
    isConfigured: boolean;
  };
  instapay: {
    identifier: string;
    accountName: string;
    isConfigured: boolean;
  };
  cardGateway: {
    providerName: 'Paymob' | 'Fawry' | 'Kashier' | 'Sandbox';
    isLiveGatewayConnected: boolean;
    integrationGuide: string;
  };
}

export const STORE_PAYMENT_CONFIG: StorePaymentConfig = {
  vodafoneCash: {
    // [PLACEHOLDER] Store owner: Set your registered 11-digit Vodafone Cash wallet number
    walletNumber: '',
    merchantName: 'Derma Bastion Official',
    isConfigured: false,
  },
  instapay: {
    // [PLACEHOLDER] Store owner: Set your official InstaPay IPA (e.g., brand@instapay)
    identifier: '',
    accountName: '',
    isConfigured: false,
  },
  cardGateway: {
    providerName: 'Paymob',
    isLiveGatewayConnected: false,
    integrationGuide:
      'To enable live card processing (Visa, Mastercard, Meeza), connect an Egyptian payment gateway (e.g., Paymob Accept, Fawry Pay, or Kashier). You will need: (1) Merchant Account ID, (2) Secret API Key, (3) Integration ID, (4) HMAC secret for transaction webhook validation.',
  },
};
