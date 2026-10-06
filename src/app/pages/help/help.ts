import { Component, inject } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-help',
  template: `
    <main class="help-page">
      <section id="shipping" class="help-page__section">
        <h1>{{ lang.t('help.shipping.title') }}</h1>
        <p>{{ lang.t('help.shipping.text') }}</p>
        <h2>{{ lang.t('help.returns.title') }}</h2>
        <p>{{ lang.t('help.returns.text') }}</p>
      </section>
      <section id="faq" class="help-page__section">
        <h2>{{ lang.t('help.faq.title') }}</h2>
        <h3>{{ lang.t('help.faq.q1') }}</h3>
        <p>{{ lang.t('help.faq.a1') }}</p>
        <h3>{{ lang.t('help.faq.q2') }}</h3>
        <p>{{ lang.t('help.faq.a2') }}</p>
        <h3>{{ lang.t('help.faq.q3') }}</h3>
        <p>{{ lang.t('help.faq.a3') }}</p>
      </section>
    </main>
  `,
  styles: [`
    .help-page { max-width: 900px; margin: 0 auto; padding: 56px 24px; }
    .help-page__section { scroll-margin-top: 24px; margin-bottom: 48px; }
    h1, h2 { color: var(--primary); }
    h3 { margin: 24px 0 8px; }
    p { line-height: 1.7; }
  `]
})
export class Help {
  readonly lang = inject(Language);
}
