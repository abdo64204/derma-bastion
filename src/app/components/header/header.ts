import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cart } from '../../services/cart';
import { Wishlist } from '../../services/wishlist';
import { Language } from '../../services/language';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  cart = inject(Cart);
  wishlist = inject(Wishlist);
  lang = inject(Language);
}
