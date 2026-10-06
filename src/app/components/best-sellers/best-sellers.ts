import { Component, computed, inject, signal } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { ProductData } from '../../services/product-data';
import { Language } from '../../services/language';
@Component({
  selector: 'app-best-sellers',
  imports: [ProductCard],
  templateUrl: './best-sellers.html',
  styleUrl: './best-sellers.scss'
})
export class BestSellers {
  private productData = inject(ProductData);
  products = this.productData.getBestSellers();
  lang = inject(Language);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal('all');
  readonly sortOrder = signal('featured');
  readonly categories = [
    { value: 'all', key: 'catalog.category.all' },
    { value: 'Skin Care', key: 'catalog.category.skin' },
    { value: 'Hair Care', key: 'catalog.category.hair' },
    { value: 'Eye Care', key: 'catalog.category.eye' }
  ];

  readonly visibleProducts = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    const category = this.selectedCategory();
    const filtered = this.products.filter(product => {
      const localized = this.lang.text(product);
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery = !query || `${localized.name} ${localized.category} ${localized.description}`
        .toLocaleLowerCase()
        .includes(query);
      return matchesCategory && matchesQuery;
    });

    if (this.sortOrder() === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (this.sortOrder() === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  });

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onSortChange(event: Event) {
    this.sortOrder.set((event.target as HTMLSelectElement).value);
  }
}
