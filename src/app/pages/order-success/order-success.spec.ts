import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { OrderSuccess } from './order-success';
import { Orders } from '../../services/orders';
import { Order } from '../../models/order.model';

describe('OrderSuccess', () => {
  let component: OrderSuccess;
  let fixture: ComponentFixture<OrderSuccess>;
  let ordersService: Orders;

  const sampleOrder: Order = {
    id: 'DB-123456',
    createdAt: new Date().toISOString(),
    delivery: {
      fullName: 'Test Customer',
      phone: '00000000000',
      address: '123 Example Street',
      city: 'Test City',
      governorate: 'Test Governorate',
      notes: ''
    },
    items: [],
    subtotal: 450,
    shipping: 50,
    total: 500,
    payment: {
      method: 'vodafone_cash',
      status: 'pending',
      receipt: {
        fileName: 'screenshot.jpg',
        fileSize: 1024,
        fileType: 'image/jpeg',
        dataUrl: 'data:image/jpeg;base64,sample',
        uploadedAt: new Date().toISOString()
      }
    }
  };

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [OrderSuccess],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'DB-123456' : null)
              }
            }
          }
        }
      ],
    }).compileComponents();

    ordersService = TestBed.inject(Orders);
    vi.spyOn(ordersService, 'getById').mockReturnValue(sampleOrder);

    fixture = TestBed.createComponent(OrderSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create and load order by route param', () => {
    expect(component).toBeTruthy();
    expect(component.order).toEqual(sampleOrder);
  });

  it('toggles receipt lightbox display state', () => {
    expect(component.showReceipt()).toBe(false);
    component.toggleReceipt();
    expect(component.showReceipt()).toBe(true);
    component.toggleReceipt();
    expect(component.showReceipt()).toBe(false);
  });
});
