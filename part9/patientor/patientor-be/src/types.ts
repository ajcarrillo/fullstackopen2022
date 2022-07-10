// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export type NewPatient = Omit<IPatient, "id">

export interface IPatient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type PublicPatient = Omit<IPatient, 'ssn' | 'entries'>
