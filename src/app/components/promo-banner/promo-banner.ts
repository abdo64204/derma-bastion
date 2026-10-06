import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-promo-banner',
  styleUrl: './promo-banner.scss',
  templateUrl: './promo-banner.html',
})
export class PromoBanner {
  readonly eyebrow = input('');
  readonly title = input('');
  readonly text = input('');
  readonly buttonText = input('');
  readonly variant = input('light');
  readonly targetFragment = input('products');
}
