import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: any): void {
    console.log(message);
  }

  info(message: string): void {
    console.info(`Info: ${message}`);
  }

  error(message: string): void {
    console.error(`Error: ${message}`);
  }

  warn(message: string): void {
    console.warn(`Warning: ${message}`);
  }

  table(data: any[]) {
    console.table(data);
  }
}
