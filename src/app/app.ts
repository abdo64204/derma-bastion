import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import { AnnouncementBar } from './components/announcement-bar/announcement-bar';
import { Footer } from './components/footer/footer';


@Component({
  imports: [RouterOutlet, Header, AnnouncementBar,Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('derma-bastion');
}
