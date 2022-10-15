import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args): any {
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
    return value.filter(function(item){
      if (typeof(item.id)) {
        return JSON.stringify(item).includes(args);
      }
        return JSON.stringify(item)
        .toLowerCase()
        .includes(args);
    })

  }

}