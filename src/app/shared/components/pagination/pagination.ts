import { Component, computed, input } from '@angular/core';
import { CustomButton } from '../custom-button/custom-button';
import type { ButtonConfig, PaginationConfig } from '../../contracts/types';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CustomButton, UpperCasePipe],
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly paginationConfig = input.required<PaginationConfig>();
  protected readonly currentPage = computed(() => this.paginationConfig().currentPage);
  protected readonly totalPages = computed(() => this.paginationConfig().totalPages);

  private readonly paginationButtonClasses =
    'border border-gray-200 bg-white text-black hover:border-black hover:bg-gray-50';

  protected readonly prevButtonConfig: ButtonConfig = {
    label: 'Anterior',
    type: 'button',
    customClasses: this.paginationButtonClasses,
  };

  protected readonly nextButtonConfig: ButtonConfig = {
    label: 'Siguiente',
    type: 'button',
    customClasses: this.paginationButtonClasses,
  };
}
