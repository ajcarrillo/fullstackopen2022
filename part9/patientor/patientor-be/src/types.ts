export enum Gender {
  MALE = "male",
  FEMALE = "female"
}

export type NewPatient = Omit<IPatient, "id">

export interface IPatient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}
