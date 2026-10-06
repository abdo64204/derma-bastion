import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ProductDetails } from './pages/product-details/product-details';
import { Wishlist } from './pages/wishlist/wishlist';
import { CartPage } from './pages/cart-page/cart-page';
import { Checkout } from './pages/checkout/checkout';
import { OrderSuccess } from './pages/order-success/order-success';
import { Track } from './pages/track/track';
import { Help } from './pages/help/help';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'product/:id', component: ProductDetails },
  { path: 'wishlist', component: Wishlist },
  { path: 'cart', component: CartPage },
  { path: 'checkout', component: Checkout },
  { path: 'order-success/:id', component: OrderSuccess },
  { path: 'track', component: Track },
  { path: 'help', component: Help },
  { path: '**', redirectTo: '' }
];
