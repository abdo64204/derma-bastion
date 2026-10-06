import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductData } from '../../services/product-data';
import { Wishlist as WishlistService } from '../../services/wishlist';
import { Language } from '../../services/language';
@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist {
  private productData = inject(ProductData);
  private wishlist = inject(WishlistService);
  lang = inject(Language);
  products = computed(() =>
    this.productData.getAll().filter(product => this.wishlist.has(product.id))
  );
}
