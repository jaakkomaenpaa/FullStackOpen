import { Gender, NewEntry } from './types';

export const toNewEntry = (object: unknown): NewEntry => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 
'occupation' in object && 'gender' in object) {
    const newEntry: NewEntry = {
      name: parseName(object.name),
      ssn: parseName(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parseName(object.occupation),
      gender: parseGender(object.gender)
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text == 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

