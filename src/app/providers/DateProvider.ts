import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateProvider {
  constructor(public http: HttpClient) {}

  getDateFormat(d: Date = new Date()): string {
    let result = '';
    // GET ANIO
    result += d.getFullYear().toString() + '-';
    // GET MONTH
    if (d.getMonth() + 1 <= 9) {
      result += '0' + (d.getMonth() + 1).toString() + '-';
    } else {
      result += (d.getMonth() + 1).toString() + '-';
    }

    // GET DAY
    if (d.getDate() <= 9) {
      result += '0' + d.getDate().toString();
    } else {
      result += d.getDate().toString();
    }
    return result;
  }

  getHourFormat(d: Date = new Date()): string {
    let result = '';
    // GET HOUR
    if (d.getHours() <= 9) {
      result += '0' + d.getHours().toString() + ':';
    } else {
      result += d.getHours().toString() + ':';
    }
    // GET MINUTES
    if (d.getMinutes() <= 9) {
      result += '0' + d.getMinutes().toString() + ':';
    } else {
      result += d.getMinutes().toString() + ':';
    }

    // GET SECONDS
    if (d.getSeconds() <= 9) {
      result += '0' + d.getSeconds().toString();
    } else {
      result += d.getSeconds().toString();
    }
    return result;
  }

  getDateTimeFormat(d: Date = new Date()): string {
    let result = '';
    result = this.getDateFormat(d) + ' ' + this.getHourFormat(d);
    return result;
  }
}
