import { blue, green, red, yellow } from "@mui/material/colors";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { FC } from 'react';
import { EntryProps, HealthCheckEntry, HealthCheckRating } from '../types';
import { entryBoxStyles, flexAlignCenter } from './EntryDetail';

const HealthCheck: FC<EntryProps> = (props) => {
  const entry = props.entry as HealthCheckEntry;
  const rating = entry.healthCheckRating;
  const sx =
    rating === HealthCheckRating.Healthy
      ? { color: blue[500] }
      : rating === HealthCheckRating.LowRisk
        ? { color: green[400] }
        : rating === HealthCheckRating.HighRisk
          ? { color: yellow[200] }
          : { color: red[200] };

  return (
    <div style={entryBoxStyles}>
      <div style={flexAlignCenter}>
        <span>{entry.date}</span> <MedicalInformationIcon/>
      </div>
      <div style={flexAlignCenter}>
        <p>{entry.description}</p>
        <HealthAndSafetyIcon sx={sx}/>
      </div>
      <p>Diagnosis by: {entry.specialist}</p>
      {props.mapCodes()}
    </div>
  );
};

export default HealthCheck;
