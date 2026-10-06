import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Orders } from '../../services/orders';
import { Language } from '../../services/language';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss'
})
export class OrderSuccess {
  private route = inject(ActivatedRoute);
  private orders = inject(Orders);
  lang = inject(Language);

  order = this.orders.getById(this.route.snapshot.paramMap.get('id') ?? '');
  showReceipt = signal(false);

  toggleReceipt() {
    this.showReceipt.update(v => !v);
  }
}
