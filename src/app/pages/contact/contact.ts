import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export default class Contact implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if (!this.platform) {
    //
    // }
    //
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Este es el contact page' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola mundo' });
  }
}
