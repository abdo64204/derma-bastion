import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { DeliveryDetails, Order } from '../models/order.model';
import { OrderPaymentInfo } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class Orders {
  private readonly storageKey = 'derma-bastion-orders';

  private orders = signal<Order[]>(this.load());

  create(
    delivery: DeliveryDetails,
    items: CartItem[],
    subtotal: number,
    shipping: number,
    total: number,
    payment?: OrderPaymentInfo
  ): Order {
    const order: Order = {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      delivery,
      items,
      subtotal,
      shipping,
      total,
      payment: payment ?? { method: 'cod', status: 'paid_on_delivery' }
    };

    this.orders.update(list => [...list, order]);
    this.save();

    return order;
  }

  getById(id: string): Order | undefined {
    const wanted = id.trim().toLowerCase();
    return this.orders().find(order => order.id.toLowerCase() === wanted);
  }

  private generateId(): string {
    const existing = this.orders().map(order => order.id);
    let id: string;

    do {
      id = 'DB-' + Math.floor(100000 + Math.random() * 900000);
    } while (existing.includes(id));

    return id;
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.orders()));
  }

  private load(): Order[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return [];
      const parsed: Order[] = JSON.parse(saved);
      return parsed.map(order => ({
        ...order,
        payment: order.payment ?? { method: 'cod', status: 'paid_on_delivery' }
      }));
    } catch {
      return [];
    }
  }
}
