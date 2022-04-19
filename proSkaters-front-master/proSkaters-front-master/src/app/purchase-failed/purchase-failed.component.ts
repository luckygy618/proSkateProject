import { Component, OnInit } from '@angular/core';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-purchase-failed',
  templateUrl: './purchase-failed.component.html',
  styleUrls: ['./purchase-failed.component.scss'],
})
export class PurchaseFailedComponent implements OnInit {
  stripe: IconDefinition = faCcStripe;

  constructor() {}

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {}
}
