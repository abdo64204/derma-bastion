import { CartItem } from '../services/cart';
import { OrderPaymentInfo } from './payment.model';

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes: string;
}

export interface Order {
  id: string;
  createdAt: string;
  delivery: DeliveryDetails;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: OrderPaymentInfo;
}
