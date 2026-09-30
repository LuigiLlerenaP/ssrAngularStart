import { Component, input } from '@angular/core';
import { CustomButton } from '../custom-button/custom-button';
import { PageHeaderConfig } from '../../contracts/types';

@Component({
  selector: 'app-header-actions',
  imports: [CustomButton],
  templateUrl: './header-actions.html',
})
export class HeaderActions {
  readonly pageHeaderConfig = input.required<PageHeaderConfig>();
}
