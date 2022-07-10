import { FC } from 'react';
import { EntryProps, OccupationalHealthcareEntry } from '../types';
import WorkIcon from "@mui/icons-material/Work";
import { entryBoxStyles } from './EntryDetail';

const OccupationalHealthcare: FC<EntryProps> = (props) => {
  const entry = props.entry as OccupationalHealthcareEntry;
  return (
    <div style={entryBoxStyles}>
      <p>
        {entry.date} <WorkIcon/>
      </p>
      <p>Employer: {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>Diagnosis by: {entry.specialist}</p>
      {props.mapCodes()}
    </div>
  );
};

export default OccupationalHealthcare;
