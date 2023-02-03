import * as _ from 'lodash';

import * as moment from 'moment';

import { FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

export const getFileNameFromResponseContentDisposition = (
  res: HttpResponse<any>
) => {
  const contentDisposition = res.headers.get('content-disposition') || '';
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  let fileName = '';
  const matches = filenameRegex.exec(contentDisposition);
  if (matches != null && matches[1]) {
    fileName = matches[1].replace(/['"]/g, '');
  }
  return fileName;
};

export function removeByAttr(arr, attr, value) {
  let i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

export function newId() {
  return 'new_' + Math.random().toString(36).slice(2);
}
export function newIntId() {
  const randomNumber = Math.floor(Math.random() * -201) - 100;
  return randomNumber;
}

export function numbring() {
  var number = 0;
  return ++number;
}
export function setNewIdNull(id: string) {
  if (id.startsWith('new')) {
    return null;
  } else {
    return id;
  }
}

export const isBlank = function (stringValue) {
  return (
    _.isUndefined(stringValue) ||
    _.isNull(stringValue) ||
    stringValue.trim().length === 0
  );
};

export const isNull = function (stringValue) {
  return _.isUndefined(stringValue) || _.isNull(stringValue);
};

export function dateFromString(dateString: string) {
  const parts = dateString.split('/');
  return new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10),
    parseInt(parts[0], 10)
  );
}

// export function dateFromString1(stringDate: any) {
//   return parse(stringDate);

// }
// export function defaultDate() {
//   return parse(format(new Date(), 'DD/MM/YYYY'));
// }

export function getProgramCode(selectedForm: FormGroup, programs: any[]) {
  const programName = selectedForm.get('programName').value;
  const programCode = selectActiveItems(programs).find(
    (option) => option.name === programName
  ).code;
  selectedForm.patchValue({ programName: programCode }, { emitEvent: true });

  return selectedForm;
}

export function getProgramName(selectedForm: FormGroup, programs: any[]) {
  const programCode = selectedForm.get('programName').value;
  const programName = selectActiveItems(programs).find(
    (option) => option.code === programCode
  ).name;
  selectedForm.patchValue({ programName: programName }, { emitEvent: true });

  return selectedForm;
}

export function filterActiveItems(value: string, programs: any[]) {
  return selectActiveItems(programs).filter((option) =>
    option?.name?.toLowerCase().includes(value?.toLowerCase())
  );
}

export function filterItems(value: string, programs: any[]) {
  return programs.filter((option) =>
    option?.name?.toLowerCase().includes(value?.toLowerCase())
  );
}

export function selectActiveItems(programs: any[]) {
  return programs.filter((option) => option.status === 'Active');
}

// export function stringFromDate(date: Date) {
//   if (date) {
//     return format(date, 'DD/MM/YYYY');
//   } else {
//     return format(new Date(), 'DD/MM/YYYY');
//   }

// }

export function formatDateTime(date: Date): string {
  if (!date) {
    return '';
  }

  return moment(date).format('DD/MM/YYYY hh:mm A');
}

export function merge(a: any, b: any) {
  const ret = _.map(a, function (obj: any) {
    // add the properties from second array matching the userID
    // to the object from first array and return the updated object
    return _.assign({}, obj, _.find(b, { id: obj.id }));
  });
  console.log(ret);
  return _.assign({}, ret);
}

// export function dateDiff(startDate: any, endDate: any, type = '') {
//   const a = dateFromString1(startDate);
//   const b = dateFromString1(endDate);
//   switch (type) {
//     case 'days':
//       return differenceInDays(a, b);
//     case 'weeks':
//       return differenceInWeeks(a, b);
//     case 'years':
//       return differenceInYears(a, b);
//     case 'months':
//       return differenceInMonths(a, b);
//     default:
//       return differenceInDays(a, b);
//   }
// }

export function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value));
}

export function getKeyValue(arr: any[]): any {
  const ret = _.fromPairs(
    arr.map(function (item) {
      return [item.id, item.name];
    })
  );

  return ret;
}

export function extractValues(mappings): any {
  return Object.keys(mappings);
}

export function richSelectCellRenderer(params) {
  if (params && params.valueFormatted) {
    return (
      '<span style="color:"' +
      removeSpaces(params.valueFormatted) +
      '">"' +
      params.valueFormatted +
      '</span>'
    );
  }
  return '';
}
export function lookupValue(mappings, key) {
  console.log(mappings);
  if (key && key !== '') {
    return mappings[key];
  }
  return '';
}
export function lookupKey(mappings, name) {
  for (let key in mappings) {
    if (mappings.hasOwnProperty(key)) {
      if (name === mappings[key]) {
        return key;
      }
    }
  }
}
function removeSpaces(str) {
  return str.replace(/\s/g, '');
}

export function markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach((control) => {
    control.markAsTouched();

    if (control.controls) {
      control.controls.forEach((c) => this.markFormGroupTouched(c));
    }
  });
}

export interface Chips {
  tag: string;
  id: string;
}

export const reminderTypes: any[] = [
  { id: -1, name: '' },
  { id: 1, name: 'Days' },
  { id: 2, name: 'Weeks' },
  { id: 3, name: 'Months' },
];

export const reminderFrequency: any[] = [
  { id: 1, name: 'Recurring' },
  { id: 2, name: 'Before' },
  { id: 3, name: 'After' },
];
export declare type DictionaryNum<T> = {
  [id: number]: T;
};

export declare abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T;
}

export interface IKeyedCollection<T> {
  Add(key: string, value: T);
  ContainsKey(key: string): boolean;
  Count(): number;
  Item(key: string): T;
  Keys(): string[];
  Remove(key: string): T;
  Values(): T[];
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
  private items: { [index: string]: T } = {};

  private count = 0;

  public ContainsKey(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  public Count(): number {
    return this.count;
  }

  public Add(key: string, value: T) {
    if (!this.items.hasOwnProperty(key)) {
      this.count++;
    }

    this.items[key] = value;
  }

  public Remove(key: string): T {
    let val = this.items[key];
    delete this.items[key];
    this.count--;
    return val;
  }

  public Item(key: string): T {
    return this.items[key];
  }

  public Keys(): string[] {
    let keySet: string[] = [];

    for (let prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }
    return keySet;
  }

  public Values(): T[] {
    let values: T[] = [];
    for (let prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        values.push(this.items[prop]);
      }
    }
    return values;
  }
}

export function reminderTypesCollection(): KeyedCollection<{
  id: string;
  name: string;
}> {
  const ret: KeyedCollection<{ id: string; name: string }> =
    new KeyedCollection<{ id: string; name: string }>();
  reminderTypes.map((r) => ret.Add(r.id, r));
  return ret;
}

export function reminderFrequencyCollection(): KeyedCollection<{
  id: string;
  name: string;
}> {
  const ret: KeyedCollection<{ id: string; name: string }> =
    new KeyedCollection<{ id: string; name: string }>();
  reminderFrequency.map((r) => ret.Add(r.id, r));
  return ret;
}

export function dateFromString1(dateString: any, userFormat = 'dd/mm/yyyy') {
  if (_.isDate(dateString)) {
    return dateString;
  }
  let delimiter, theFormat, theDate, month, date, year;
  // Set default format if userFormat is not provided
  userFormat = userFormat || 'dd/mm/yyyy';

  // Find custom delimiter by excluding
  // month, day and year characters
  delimiter = /[^dmy]/.exec(userFormat)[0];

  // Create an array with month, day and year
  // so we know the format order by index
  theFormat = userFormat.split(delimiter);

  // Create an array of dateString.
  theDate = dateString.split(delimiter);
  for (let i = 0, len = theDate.length; i < len; i++) {
    // assigning values for date, month and year based on theFormat array.
    if (/d/.test(theFormat[i])) {
      date = theDate[i];
    } else if (/m/.test(theFormat[i])) {
      month = parseInt(theDate[i], 10) - 1;
    } else if (/y/.test(theFormat[i])) {
      year = theDate[i];
    }
  }
  return new Date(Date.UTC(year, month, date));
}

export interface ICodeOption {
  code: string;
  name: string;
  group: string;
  description: string;
}

export interface SearchParam {
  entityName?: string;
  searchString: string;
  searchColumn?: string;
  resultColumns?: string;
  searchColumn1?: string;
  filterString?: string;
  exactMatch?: boolean;
  filterStringValue?: string;
}

export function errorMsg(err) {
  return err.error ? err.error.value : err.error;
}
