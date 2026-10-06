import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private readonly storageKey = 'derma-bastion-cart';

  readonly freeShippingFrom = 1500;
  private readonly shippingFee = 60;

  private items = signal<CartItem[]>(this.load());

  readonly cartItems = this.items.asReadonly();

  readonly count = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly shipping = computed(() =>
    this.items().length === 0 || this.subtotal() >= this.freeShippingFrom
      ? 0
      : this.shippingFee
  );

  readonly total = computed(() => this.subtotal() + this.shipping());

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }

  add(product: Product, quantity = 1) {
    this.items.update(list => {
      const existing = list.find(item => item.product.id === product.id);

      if (existing) {
        return list.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...list, { product, quantity }];
    });
  }

  increase(id: number) {
    this.changeQuantity(id, 1);
  }

  decrease(id: number) {
    this.changeQuantity(id, -1);
  }

  remove(id: number) {
    this.items.update(list => list.filter(item => item.product.id !== id));
  }

  clear() {
    this.items.set([]);
  }

  private changeQuantity(id: number, change: number) {
    this.items.update(list =>
      list.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  }

  private load(): CartItem[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
}
