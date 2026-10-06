import { TestBed } from '@angular/core/testing';
import { Language } from './language';
import { Product } from '../models/product.model';

describe('Language', () => {
  let service: Language;

  const mockProduct: Product = {
    id: 1,
    name: 'English Name',
    category: 'Skin Care',
    price: 100,
    image: '',
    description: 'English Desc',
    benefits: ['Benefit EN'],
    howToUse: 'How to use EN',
    ingredients: 'Ingredients EN',
    ar: {
      name: 'اسم عربي',
      category: 'العناية بالبشرة',
      description: 'وصف عربي',
      benefits: ['ميزة عربية'],
      howToUse: 'طريقة الاستخدام عربي',
      ingredients: 'مكونات عربي',
    }
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Language);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should switch language and update document direction and language attribute', () => {
    // Default is 'en'
    if (service.lang() !== 'en') {
      service.toggle();
    }
    expect(service.lang()).toBe('en');
    expect(service.isArabic()).toBe(false);
    expect(service.dir()).toBe('ltr');
    expect(service.otherLabel()).toBe('العربية');

    // Toggle to 'ar'
    service.toggle();
    expect(service.lang()).toBe('ar');
    expect(service.isArabic()).toBe(true);
    expect(service.dir()).toBe('rtl');
    expect(service.otherLabel()).toBe('English');

    // Toggle back to 'en'
    service.toggle();
    expect(service.lang()).toBe('en');
    expect(service.isArabic()).toBe(false);
    expect(service.dir()).toBe('ltr');
  });

  it('should translate keys with and without parameters in both languages', () => {
    if (service.lang() !== 'en') {
      service.toggle();
    }
    expect(service.t('currency')).toBe('EGP');
    expect(service.t('announcement.text', { amount: 1500, currency: 'EGP' })).toContain('1500 EGP');

    service.toggle(); // switch to Arabic
    expect(service.t('currency')).toBe('ج.م');
    expect(service.t('announcement.text', { amount: 1500, currency: 'ج.م' })).toContain('1500 ج.م');
  });

  it('should resolve localized product text based on active language', () => {
    if (service.lang() !== 'en') {
      service.toggle();
    }
    const enText = service.text(mockProduct);
    expect(enText.name).toBe('English Name');

    service.toggle(); // switch to Arabic
    const arText = service.text(mockProduct);
    expect(arText.name).toBe('اسم عربي');
    expect(arText.description).toBe('وصف عربي');
  });

  it('should format dates properly in English and Arabic', () => {
    const testDate = new Date('2026-10-06T12:00:00Z');

    if (service.lang() !== 'en') {
      service.toggle();
    }
    const enFormatted = service.formatDate(testDate, 'shortDate');
    expect(enFormatted).toBeTruthy();
    expect(enFormatted).toContain('2026');

    service.toggle(); // switch to Arabic
    const arFormatted = service.formatDate(testDate, 'shortDate');
    expect(arFormatted).toBeTruthy();
  });
});
