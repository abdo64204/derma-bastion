import { Injectable, computed, effect, inject, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Wishlist {

  private readonly storageKey = 'derma-bastion-wishlist';

  private ids = signal<number[]>(this.load());

  readonly count = computed(() => this.ids().length);

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.ids()));
    });
  }

  has(id: number): boolean {
    return this.ids().includes(id);
  }

  toggle(id: number) {
    this.ids.update(list =>
      list.includes(id) ? list.filter(x => x !== id) : [...list, id]
    );
  }

  private load(): number[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
}
