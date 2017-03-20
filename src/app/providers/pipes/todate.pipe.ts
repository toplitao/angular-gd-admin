import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'todate'})
export class ToDatePipe implements PipeTransform {
    public transform(timestamp: number): string {
        return moment(timestamp * 1000).format('YYYY-MM-DD');
    }
}
