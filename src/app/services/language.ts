import { Injectable, computed, effect, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { Product, ProductTranslation } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class Language {
  private readonly storageKey = 'derma-bastion-lang';

  readonly lang = signal<Lang>(this.load());
  readonly isArabic = computed(() => this.lang() === 'ar');
  readonly dir = computed(() => (this.isArabic() ? 'rtl' : 'ltr'));
  readonly otherLabel = computed(() => (this.isArabic() ? 'English' : 'العربية'));

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
      document.documentElement.dir = this.dir();
      localStorage.setItem(this.storageKey, this.lang());
    });
  }

  toggle() {
    this.lang.update(current => (current === 'en' ? 'ar' : 'en'));
  }

  t(key: string, params?: Record<string, string | number>): string {
    const text = TRANSLATIONS[this.lang()][key] ?? TRANSLATIONS.en[key] ?? key;

    if (!params) {
      return text;
    }

    return text.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? ''));
  }
    text(product: Product): ProductTranslation {
    if (this.isArabic() && product.ar) {
      return product.ar;
    }

    return product;
  }

  formatDate(
    value: string | number | Date | null | undefined,
    style: 'medium' | 'shortDate' | 'time' = 'medium'
  ): string {
    if (!value) {
      return '';
    }
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) {
      return '';
    }

    const locale = this.isArabic() ? 'ar-EG' : 'en-US';

    if (style === 'shortDate') {
      return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
    }

    if (style === 'time') {
      return new Intl.DateTimeFormat(locale, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }).format(date);
    }

    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  }

  private load(): Lang {
    try {
      return localStorage.getItem(this.storageKey) === 'ar' ? 'ar' : 'en';
    } catch {
      return 'en';
    }
  }
}
