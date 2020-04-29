import { Injectable } from '@angular/core';
import * as moment from 'moment';

export enum UnitsConversion {
  HOURS_TO_MILLISECONDS = 3600000
}

@Injectable({
  providedIn: 'root'
})
export class UnitsConversionService {

  constructor() { }

  getHoursFromMilliseconds(milliseconds: number) {

    return milliseconds / UnitsConversion.HOURS_TO_MILLISECONDS;
  }

  getTimeStringFromISO(time) {
    return moment(time).toString();
  }

  convertMillisecondsToEstimatedTime(milliseconds) {

    const minutes = milliseconds / (60 * 1000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    let estimatedTime = this.getStringOfUnit(weeks, 'w') + this.getStringOfUnit(days % 7, 'd') + this.getStringOfUnit(hours % 24, 'h') + this.getStringOfUnit(minutes % 60, 'm');

    if (estimatedTime === '') {
      estimatedTime = '0m';
    }

    return estimatedTime;
  }

  getStringOfUnit(unitValue, unit) {
    if (unitValue != 0) {
      return unitValue + unit + ' ';
    }
    return '';

  }
}
