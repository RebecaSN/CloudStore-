
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesUtilities {

  constructor() { }
  /**
 * * Função de converção das propriedades de um objeto
 * * Antes:
 * * * {
 * * * * Data: any,
 * * * * Failed: boolean,
 * * * * Success: boolean,
 * * * * Message: string,
 * * * * Error: []
 * * * }
 * * Depois:
 * * * {
 * * * * data: any,
 * * * * failed: boolean,
 * * * * success: boolean,
 * * * * message: string,
 * * * * error: []
 * * * }
 * @param object
 * @returns
 */
  public static convertAllPropertToLowerCase(object: Object) {
    return Object.entries(object).reduce((a, [key, value]) => {
      a[key.toLowerCase()] = value;
      return a;
    }, {});
  }
}
