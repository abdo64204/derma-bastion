import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Language } from '../../services/language';

@Component({
  selector: 'app-product-artwork',
  template: `
    <div class="artwork" [class.artwork--skin]="product().category === 'Skin Care'"
      [class.artwork--hair]="product().category === 'Hair Care'"
      [class.artwork--eye]="product().category === 'Eye Care'"
      role="img" [attr.aria-label]="lang.text(product()).name">
      <span class="artwork__orb artwork__orb--one"></span>
      <span class="artwork__orb artwork__orb--two"></span>
      <span class="artwork__bottle" aria-hidden="true">
        <span class="artwork__cap"></span>
        <span class="artwork__label"><span>DERMA</span><strong>BASTION</strong><i></i></span>
      </span>
      <span class="artwork__vial" aria-hidden="true"><span></span></span>
      <span class="artwork__leaf artwork__leaf--one" aria-hidden="true"></span>
      <span class="artwork__leaf artwork__leaf--two" aria-hidden="true"></span>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .artwork {
      --tone: #d9c1aa; --deep: #8e6e55; --glow: #f4e7d7;
      position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 150px;
      overflow: hidden; isolation: isolate; background: radial-gradient(circle at 50% 42%, var(--glow), #e8e1d6 72%);
    }
    .artwork--hair { --tone: #b4b99f; --deep: #657052; --glow: #e3e7d8; }
    .artwork--eye { --tone: #c4b8d2; --deep: #74647f; --glow: #eee8f2; }
    .artwork__orb { position: absolute; display: block; border-radius: 50%; background: #fff8; }
    .artwork__orb--one { width: 190px; height: 190px; inset: auto auto -55px -38px; }
    .artwork__orb--two { width: 135px; height: 135px; inset: -35px -15px auto auto; background: var(--tone); opacity: .36; }
    .artwork__bottle { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; width: 82px; height: 130px; margin-top: 20px; border-radius: 12px 12px 18px 18px; background: linear-gradient(95deg, #fff9, var(--tone) 35%, #fff8 78%); box-shadow: 0 16px 24px #43352630; }
    .artwork__cap { width: 34px; height: 24px; margin-top: -20px; border-radius: 6px 6px 2px 2px; background: linear-gradient(90deg, var(--deep), var(--tone)); }
    .artwork__label { display: grid; justify-items: center; gap: 3px; margin-top: 31px; color: var(--deep); font: 7px/1 Arial, sans-serif; letter-spacing: 1px; }
    .artwork__label strong { font-size: 8px; letter-spacing: .5px; }
    .artwork__label i { display: block; width: 28px; height: 2px; margin-top: 4px; background: var(--deep); opacity: .5; }
    .artwork__vial { position: absolute; z-index: 2; width: 34px; height: 76px; margin: 43px 0 0 88px; border: 1px solid #fff9; border-radius: 7px 7px 10px 10px; background: linear-gradient(90deg, #fff9, var(--tone)); box-shadow: 0 10px 17px #43352625; }
    .artwork__vial span { display: block; width: 13px; height: 18px; margin: -15px auto 0; background: var(--deep); border-radius: 3px 3px 0 0; }
    .artwork__leaf { position: absolute; z-index: -1; width: 30px; height: 62px; border: 2px solid var(--deep); border-radius: 100% 0 100% 0; opacity: .35; transform: rotate(-35deg); }
    .artwork__leaf--one { margin: 92px 0 0 -118px; }
    .artwork__leaf--two { margin: -76px 0 0 117px; transform: rotate(35deg) scale(.72); }
  `]
})
export class ProductArtwork {
  readonly product = input.required<Product>();
  readonly lang = inject(Language);
}
