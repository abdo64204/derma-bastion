import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  lang = inject(Language);
  year = new Date().getFullYear();

  linkGroups = [
    {
      titleKey: 'footer.quick',
      links: [
        { key: 'footer.link.home', route: '/', fragment: undefined },
        { key: 'footer.link.products', route: '/', fragment: 'products' },
        { key: 'footer.link.sale', route: '/', fragment: 'products' },
        { key: 'footer.link.about', route: '/about', fragment: undefined }
      ]
    },
    {
      titleKey: 'footer.help',
      links: [
        { key: 'footer.link.contact', route: '/contact', fragment: undefined },
        { key: 'footer.link.shipping', route: '/help', fragment: 'shipping' },
        { key: 'footer.link.faq', route: '/help', fragment: 'faq' }
      ]
    }
  ];

  payments = ['VISA', 'Fawry', 'valU'];
}
