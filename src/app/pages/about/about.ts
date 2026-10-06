import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  lang = inject(Language);
}
