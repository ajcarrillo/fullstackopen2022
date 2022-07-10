import { EntryProps, HospitalEntry } from '../types';
import { FC } from 'react';
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { entryBoxStyles, flexAlignCenter } from './EntryDetail';

const Hospital: FC<EntryProps> = (props) => {
  const entry = props.entry as HospitalEntry;

  return (
    <div style={entryBoxStyles}>
      <p style={flexAlignCenter}>
        <span>{entry.date}</span> <LocalHospitalIcon/>
      </p>
      <p>{entry.description}</p>
      <p>Diagnosis by: {entry.specialist}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
      {props.mapCodes()}
    </div>
  );
}

export default Hospital;
