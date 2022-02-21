import { Component, OnInit, Input } from '@angular/core';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
  alert: any = faExclamationTriangle;

  constructor() { }

  ngOnInit(): void {
  }

}
