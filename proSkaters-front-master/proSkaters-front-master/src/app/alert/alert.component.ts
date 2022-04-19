import { Component, Input, OnInit } from '@angular/core';

import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'error' | 'warning' | 'info';
  @Input() message: string;
  @Input() display: boolean;
  alertCircle: any = faExclamationCircle;
  alertTriangle: any = faExclamationTriangle;
  check: any = faCheckCircle;
  info: any = faInfoCircle;

  constructor() {}

  ngOnInit(): void {}
}
