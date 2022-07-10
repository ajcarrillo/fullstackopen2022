import { assertNever, Entry } from '../types';
import { FC } from 'react';
import { useStateValue } from "../state";
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';

export const entryBoxStyles = {
  border: "1px solid black",
  borderRadius: "5px",
  marginBottom: "1rem",
  padding: "1rem",
}

export const flexAlignCenter = {
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  columnGap: "0.5rem",
}

const EntryDetail: FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const mapCodes = () => {
    return entry.diagnosisCodes?.map((code) => {
      const codeDiagnosis = diagnoses.find(
        (diagnosis) => diagnosis.code === code
      );

      return (
        <div key={code}>
          <p>
            {code}
            {"  -  ["}
            {codeDiagnosis?.name}
            {"]  -  ["}
            {codeDiagnosis?.latin}
            {"]"}
          </p>
        </div>
      );
    });
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry
        entry={entry}
        mapCodes={mapCodes}
      />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare
        entry={entry}
        mapCodes={mapCodes}
      />
    case "HealthCheck":
      return <HealthCheck
        entry={entry}
        mapCodes={mapCodes}
      />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
