import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPrice implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(Number(value));
  }
}