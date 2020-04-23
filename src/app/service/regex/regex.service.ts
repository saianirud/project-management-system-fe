import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {

  constructor() { }

  public TIME_ESTIMATE_REGEX = ' *([0-9]+(w|W))?( (?=[0-9]+(d|D|h|H|m|M)))?([0-9]+(d|D))?( (?=[0-9]+(h|H|m|M)))?([0-9]+(h|H))?( (?=[0-9]+(m|M)))?([0-9]+(m|M))? *';
}
