import { TestBed } from '@angular/core/testing';
import { Orders } from './orders';
import { DeliveryDetails } from '../models/order.model';
import { OrderPaymentInfo } from '../models/payment.model';

describe('Orders', () => {
  let service: Orders;

  const mockDelivery: DeliveryDetails = {
    fullName: 'Test Customer',
    phone: '00000000000',
    address: '123 Example Street',
    city: 'Test City',
    governorate: 'Test Governorate',
    notes: 'Test delivery note'
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orders);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates an order with default COD payment when payment info is omitted', () => {
    const order = service.create(mockDelivery, [], 500, 50, 550);

    expect(order.id).toMatch(/^DB-\d{6}$/);
    expect(order.payment).toBeDefined();
    expect(order.payment.method).toBe('cod');
    expect(order.payment.status).toBe('paid_on_delivery');
  });

  it('creates an order with card payment information without storing sensitive data', () => {
    const cardPayment: OrderPaymentInfo = {
      method: 'card',
      status: 'pending',
      cardNetwork: 'visa',
      maskedCard: '•••• •••• •••• 4242',
      gatewayNote: 'Payment authorization logged.'
    };

    const order = service.create(mockDelivery, [], 1000, 0, 1000, cardPayment);

    expect(order.payment.method).toBe('card');
    expect(order.payment.cardNetwork).toBe('visa');
    expect(order.payment.maskedCard).toBe('•••• •••• •••• 4242');
    expect(order.payment.status).toBe('pending');

    const retrieved = service.getById(order.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.payment.maskedCard).toBe('•••• •••• •••• 4242');
  });

  it('creates an order with Vodafone Cash payment and attached receipt', () => {
    const vfcPayment: OrderPaymentInfo = {
      method: 'vodafone_cash',
      status: 'pending',
      receipt: {
        fileName: 'vf_receipt.png',
        fileSize: 1024,
        fileType: 'image/png',
        dataUrl: 'data:image/png;base64,mockPngData',
        uploadedAt: new Date().toISOString()
      }
    };

    const order = service.create(mockDelivery, [], 750, 50, 800, vfcPayment);

    expect(order.payment.method).toBe('vodafone_cash');
    expect(order.payment.receipt).toBeDefined();
    expect(order.payment.receipt?.fileName).toBe('vf_receipt.png');
  });

  it('creates an order with InstaPay payment and attached receipt', () => {
    const instapayPayment: OrderPaymentInfo = {
      method: 'instapay',
      status: 'pending',
      receipt: {
        fileName: 'instapay_transfer.jpg',
        fileSize: 2048,
        fileType: 'image/jpeg',
        dataUrl: 'data:image/jpeg;base64,mockJpgData',
        uploadedAt: new Date().toISOString()
      }
    };

    const order = service.create(mockDelivery, [], 300, 50, 350, instapayPayment);

    expect(order.payment.method).toBe('instapay');
    expect(order.payment.receipt?.fileName).toBe('instapay_transfer.jpg');
  });
});
