import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Orders } from '../../services/orders';
import { Order } from '../../models/order.model';
import { Language } from '../../services/language';

@Component({
  selector: 'app-track',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './track.html',
  styleUrl: './track.scss'
})
export class Track {
  private route = inject(ActivatedRoute);
  private orders = inject(Orders);
  private destroyRef = inject(DestroyRef);
  lang = inject(Language);

  readonly stepKeys = [
    { titleKey: 'track.step0.title', textKey: 'track.step0.text' },
    { titleKey: 'track.step1.title', textKey: 'track.step1.text' },
    { titleKey: 'track.step2.title', textKey: 'track.step2.text' },
    { titleKey: 'track.step3.title', textKey: 'track.step3.text' },
    { titleKey: 'track.step4.title', textKey: 'track.step4.text' },
  ];

  // Minutes between each step. 1 for demo; change to e.g. 24 * 60 for production.
  private readonly stepMinutes = 1;

  orderNumber = '';
  searched = signal(false);
  order = signal<Order | undefined>(undefined);

  private now = signal(Date.now());

  currentStep = computed(() => {
    const order = this.order();
    if (!order) {
      return 0;
    }

    const elapsed = this.now() - new Date(order.createdAt).getTime();
    const step = Math.floor(elapsed / (this.stepMinutes * 60_000));

    return Math.min(this.stepKeys.length - 1, Math.max(0, step));
  });

  finished = computed(() => this.currentStep() === this.stepKeys.length - 1);

  constructor() {
    const id = this.route.snapshot.queryParamMap.get('order');

    if (id) {
      this.orderNumber = id;
      this.search();
    }

    const timer = setInterval(() => this.now.set(Date.now()), 5000);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  search() {
    this.searched.set(true);
    this.order.set(this.orders.getById(this.orderNumber));
  }

  isDone(index: number): boolean {
    return index < this.currentStep() || this.finished();
  }

  isCurrent(index: number): boolean {
    return index === this.currentStep() && !this.finished();
  }

  stepTime(index: number): Date | null {
    const order = this.order();
    if (!order) {
      return null;
    }

    const start = new Date(order.createdAt).getTime();
    return new Date(start + index * this.stepMinutes * 60_000);
  }
}
