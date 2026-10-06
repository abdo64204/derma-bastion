import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Language } from '../../services/language';
import { ProductData } from '../../services/product-data';
import { Cart } from '../../services/cart';
import { Wishlist } from '../../services/wishlist';
import { ProductArtwork } from '../../components/product-artwork/product-artwork';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, DecimalPipe, ProductArtwork],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productData = inject(ProductData);
  private cart = inject(Cart);

  lang = inject(Language);
  wishlist = inject(Wishlist);

  product = this.productData.getById(
    Number(this.route.snapshot.paramMap.get('id'))
  );

  readonly qty = signal(1);
  readonly quantity = computed(() => this.qty());

  increase() {
    this.qty.update(v => v + 1);
  }

  decrease() {
    this.qty.update(v => Math.max(1, v - 1));
  }

  addToCart() {
    if (this.product) {
      this.cart.add(this.product, this.qty());
    }
  }
}
