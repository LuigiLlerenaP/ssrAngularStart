import { Component, computed, input } from '@angular/core';
import type { ButtonConfig } from '../../contracts/types';

@Component({
  selector: 'custom-button',
  imports: [],
  templateUrl: './custom-button.html',
})
export class CustomButton {
  readonly config = input.required<ButtonConfig>();

  protected readonly buttonType = computed(() => this.config().type ?? 'button');

  protected readonly isDisabled = computed(() => this.config().disabled ?? false);

  protected readonly hasIcon = computed(() => !!this.config().iconPath);

  protected readonly iconPath = computed(() => this.config().iconPath ?? 'M12 4v16m8-8H4');

  protected readonly computedClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center px-5 py-3 text-sm font-medium transition disabled:opacity-50 active:scale-95';
    const customClasses = this.config().customClasses ?? '';

    return `${baseClasses} ${customClasses}`.trim();
  });
}
