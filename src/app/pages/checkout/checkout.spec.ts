import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Checkout } from './checkout';
import { Cart } from '../../services/cart';
import { Orders } from '../../services/orders';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;
  let ordersService: Orders;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [provideRouter([])],
    }).compileComponents();

    ordersService = TestBed.inject(Orders);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults to Cash On Delivery (cod)', () => {
    expect(component.selectedPaymentMethod()).toBe('cod');
  });

  it('updates selected payment method when selectPaymentMethod is called', () => {
    component.selectPaymentMethod('card');
    expect(component.selectedPaymentMethod()).toBe('card');

    component.selectPaymentMethod('vodafone_cash');
    expect(component.selectedPaymentMethod()).toBe('vodafone_cash');

    component.selectPaymentMethod('instapay');
    expect(component.selectedPaymentMethod()).toBe('instapay');
  });

  it('prevents placing order when delivery form is invalid', () => {
    const createSpy = vi.spyOn(ordersService, 'create');
    component.placeOrder();

    expect(component.submitted()).toBe(true);
    expect(component.deliveryForm.invalid).toBe(true);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('requires receipt when Vodafone Cash or InstaPay is selected', () => {
    component.deliveryForm.setValue({
      fullName: 'Test Customer',
      phone: '00000000000',
      governorate: 'Test Governorate',
      city: 'Test City',
      address: '123 Example Street',
      notes: ''
    });

    component.selectPaymentMethod('vodafone_cash');
    expect(component.receipt()).toBeNull();

    const createSpy = vi.spyOn(ordersService, 'create');
    component.placeOrder();

    expect(component.receiptError()).toBe('checkout.payment.receipt.error.required');
    expect(createSpy).not.toHaveBeenCalled();

    component.selectPaymentMethod('instapay');
    component.placeOrder();
    expect(component.receiptError()).toBe('checkout.payment.receipt.error.required');
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('validates card inputs when Card payment method is selected', () => {
    component.deliveryForm.setValue({
      fullName: 'Test Customer',
      phone: '00000000000',
      governorate: 'Test Governorate',
      city: 'Test City',
      address: '123 Example Street',
      notes: ''
    });

    component.selectPaymentMethod('card');
    const createSpy = vi.spyOn(ordersService, 'create');
    component.placeOrder();

    expect(component.cardForm.invalid).toBe(true);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('places order successfully with COD and navigates to order-success', async () => {
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const cart = TestBed.inject(Cart);
    const clearSpy = vi.spyOn(cart, 'clear');

    component.deliveryForm.setValue({
      fullName: 'Test Customer',
      phone: '00000000000',
      governorate: 'Test Governorate',
      city: 'Test City',
      address: '123 Example Street',
      notes: 'Test delivery note'
    });

    component.selectPaymentMethod('cod');
    component.placeOrder();

    expect(navSpy).toHaveBeenCalled();
    const navigatedRoute = navSpy.mock.calls[0][0] as string[];
    expect(navigatedRoute[0]).toBe('/order-success');
    expect(navigatedRoute[1]).toMatch(/^DB-\d{6}$/);

    await Promise.resolve();
    expect(clearSpy).toHaveBeenCalled();
  });
});
