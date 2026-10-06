import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { DecimalPipe } from '@angular/common';
import { Cart } from '../../services/cart';
import { RouterLink } from '@angular/router';
import { Wishlist } from '../../services/wishlist';
import { Language } from '../../services/language';
import { ProductArtwork } from '../product-artwork/product-artwork';

@Component({
  imports: [DecimalPipe, RouterLink, ProductArtwork],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();

  private cart = inject(Cart);
  readonly wishlist = inject(Wishlist);
  readonly lang = inject(Language);
  readonly added = signal(false);

  toggleLike() {
    this.wishlist.toggle(this.product().id);
  }

  addToCart() {
    this.cart.add(this.product());
    this.added.set(true);
  }
}
