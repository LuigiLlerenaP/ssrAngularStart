import { Component, input } from '@angular/core';

@Component({
  selector: 'empty-list',
  imports: [],
  templateUrl: './empty-list.html',
})
export class EmptyList {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
