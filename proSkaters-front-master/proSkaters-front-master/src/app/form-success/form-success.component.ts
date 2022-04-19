import { Component, Input, OnInit } from '@angular/core';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-success',
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.scss'],
})
export class FormSuccessComponent implements OnInit {
  @Input() successMsg: string;
  @Input() displaySuccess: boolean;
  check: any = faCheckCircle;

  constructor() {}

  ngOnInit(): void {}
}
