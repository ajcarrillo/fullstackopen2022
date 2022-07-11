import { Entry, Gender, HealthCheckEntry, HospitalEntry, NewPatient, OccupationalHealthcareEntry, } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/*const isArray = (param: any): boolean => {
  return typeof param === 'object' && param instanceof Array;
}*/

const isEntry = (param: unknown): param is Entry => {
  if (typeof param === "object" && param !== null) {
    return "description" in param && "date" in param && "specialist" in param;
  } else {
    return false;
  }
};

export const parseStringData = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing data: ${data}`);
  }

  return data;
};

export const parseEntry = (entry: unknown): Entry => {
  if (!entry || !isEntry(entry)) {
    throw new Error(`Incorrect or missing entry: ${entry}`);
  }

  switch (entry.type) {
    case "Hospital":
      if (
        "discharge" in entry &&
        "date" in entry.discharge &&
        "criteria" in entry.discharge
      ) {
        return entry as HospitalEntry;
      } else {
        throw new Error("Missing parameters from Hospital-type entry");
      }

    case "HealthCheck":
      if ("healthCheckRating" in entry) {
        return entry as HealthCheckEntry;
      } else {
        throw new Error("Missing parameters from HealthCheck-type entry");
      }

    case "OccupationalHealthcare":
      if ("employerName" in entry) {
        return entry as OccupationalHealthcareEntry;
      } else {
        throw new Error("Missing parameters from Occupational-type entry");
      }

    default:
      return assertNever(entry);
  }
};

/*const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries || !isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries as Array<Entry>;
}*/

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
}

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  return {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  }
}

export default toNewPatient;
