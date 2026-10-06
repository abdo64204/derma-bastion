import { Component, inject } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PromoBanner } from '../../components/promo-banner/promo-banner';
import { BestSellers } from '../../components/best-sellers/best-sellers';
import { Language } from '../../services/language';

@Component({
  selector: 'app-home',
  imports: [Hero, PromoBanner, BestSellers],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  lang = inject(Language);
}
