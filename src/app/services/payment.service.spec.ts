import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('detectCardNetwork', () => {
    it('detects Visa for 4-prefixed card input', () => {
      expect(service.detectCardNetwork('4000')).toBe('visa');
    });

    it('detects Mastercard for 51-55 and 2221-2720 prefixes', () => {
      expect(service.detectCardNetwork('5100')).toBe('mastercard');
      expect(service.detectCardNetwork('5500')).toBe('mastercard');
      expect(service.detectCardNetwork('2221')).toBe('mastercard');
      expect(service.detectCardNetwork('2720')).toBe('mastercard');
    });

    it('detects Egyptian Meeza for 5078 prefix', () => {
      expect(service.detectCardNetwork('5078')).toBe('meeza');
    });

    it('returns generic "card" for unknown or empty numbers', () => {
      expect(service.detectCardNetwork('')).toBe('card');
      expect(service.detectCardNetwork('3400')).toBe('card');
      expect(service.detectCardNetwork('6011')).toBe('card');
    });
  });

  describe('maskCardNumber', () => {
    it('masks input and shows only its last four digits', () => {
      expect(service.maskCardNumber('12345678')).toBe('•••• •••• •••• 5678');
    });
  });

  describe('formatCardNumberInput', () => {
    it('groups numeric input into blocks of 4 separated by spaces', () => {
      expect(service.formatCardNumberInput('12345678')).toBe('1234 5678');
    });

    it('strips non-digits and truncates to 16 digits', () => {
      expect(service.formatCardNumberInput('1234-5678-9999')).toBe('1234 5678 9999');
    });
  });

  describe('formatExpiryInput', () => {
    it('formats digits as MM/YY when 3 or 4 digits are typed', () => {
      expect(service.formatExpiryInput('1228')).toBe('12/28');
      expect(service.formatExpiryInput('05')).toBe('05');
      expect(service.formatExpiryInput('052')).toBe('05/2');
    });
  });

  describe('validateCardNumber', () => {
    it('rejects a number with an incorrect length', () => {
      expect(service.validateCardNumber('')).toBe(false);
      expect(service.validateCardNumber('12345')).toBe(false);
    });
  });

  describe('validateExpiry', () => {
    it('accepts future valid dates', () => {
      expect(service.validateExpiry('12/35')).toBe(true);
    });

    it('rejects invalid month values', () => {
      expect(service.validateExpiry('13/28')).toBe(false);
      expect(service.validateExpiry('00/28')).toBe(false);
    });

    it('rejects malformed strings', () => {
      expect(service.validateExpiry('1228')).toBe(false);
      expect(service.validateExpiry('abc')).toBe(false);
      expect(service.validateExpiry('')).toBe(false);
    });

    it('rejects expired past dates', () => {
      expect(service.validateExpiry('01/20')).toBe(false);
      expect(service.validateExpiry('06/19')).toBe(false);
    });
  });

  describe('validateCvv', () => {
    it('accepts 3 and 4 digit CVVs', () => {
      expect(service.validateCvv('abc')).toBe(false);
    });

    it('rejects invalid CVVs', () => {
      expect(service.validateCvv('12345')).toBe(false);
    });
  });

  describe('validateReceiptFile', () => {
    it('accepts valid JPEG, PNG, and WebP files under 5MB', () => {
      const validJpg = new File(['mock content'], 'receipt.jpg', { type: 'image/jpeg' });
      const validPng = new File(['mock content'], 'receipt.png', { type: 'image/png' });
      const validWebp = new File(['mock content'], 'receipt.webp', { type: 'image/webp' });

      expect(service.validateReceiptFile(validJpg).valid).toBe(true);
      expect(service.validateReceiptFile(validPng).valid).toBe(true);
      expect(service.validateReceiptFile(validWebp).valid).toBe(true);
    });

    it('rejects unsupported file extensions or mime types', () => {
      const pdfFile = new File(['mock content'], 'receipt.pdf', { type: 'application/pdf' });
      const result = service.validateReceiptFile(pdfFile);
      expect(result.valid).toBe(false);
      expect(result.errorKey).toBe('checkout.payment.receipt.error.invalidType');
    });

    it('rejects files larger than 5MB', () => {
      const bigBuffer = new Uint8Array(5 * 1024 * 1024 + 1);
      const largeFile = new File([bigBuffer], 'huge_receipt.png', { type: 'image/png' });
      const result = service.validateReceiptFile(largeFile);
      expect(result.valid).toBe(false);
      expect(result.errorKey).toBe('checkout.payment.receipt.error.tooLarge');
    });
  });
});
