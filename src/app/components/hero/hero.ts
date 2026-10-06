import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  lang = inject(Language);
}
