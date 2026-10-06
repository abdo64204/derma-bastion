import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-announcement-bar',
  imports: [RouterLink],
  templateUrl: './announcement-bar.html',
  styleUrl: './announcement-bar.scss'
})
export class AnnouncementBar {
  lang = inject(Language);
  freeShippingFrom = 1500;
}
