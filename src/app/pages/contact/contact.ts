import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Language } from '../../services/language';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  lang = inject(Language);

  // Replace with real contact details
  phone = '+20 100 000 0000';
  whatsappNumber = '201000000000';
  email = 'hello@example.com';

  facebookUrl = 'https://facebook.com/';
  instagramUrl = 'https://instagram.com/';
  linkedinUrl = 'https://linkedin.com/';

  name = '';
  message = '';

  get whatsappLink(): string {
    const text = encodeURIComponent(this.lang.t('contact.whatsapp.text'));
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  }

  get telLink(): string {
    return 'tel:' + this.phone.replace(/\s/g, '');
  }

  sendEmail() {
    const subject = encodeURIComponent(
      this.lang.t('contact.email.subject', { name: this.name })
    );
    const body = encodeURIComponent(this.message);
    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
  }
}
