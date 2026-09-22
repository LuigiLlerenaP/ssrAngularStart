import { Component, inject, OnInit } from '@angular/core';

import { Meta, Title } from '@angular/platform-browser';


@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export default class About implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About');
    this.meta.updateTag({name: 'description' , content :'Este es el about'});
    this.meta.updateTag({ name: 'og:title', content: 'About page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola mundo' });
  }
}
