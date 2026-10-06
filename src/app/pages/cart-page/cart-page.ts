import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';
import { Language } from '../../services/language';
import { ProductArtwork } from '../../components/product-artwork/product-artwork';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, DecimalPipe, ProductArtwork],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {
  cart = inject(Cart);
  lang = inject(Language);
}
