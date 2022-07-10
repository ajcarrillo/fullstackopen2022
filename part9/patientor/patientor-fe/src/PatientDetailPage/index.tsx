import axios from "axios";
import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male"
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatienDetailPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
      if (!id || typeof id !== "string") {
        console.error("id not found!");
        return;
      }
      const fetchPatient = async () => {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patient);
      }
      void fetchPatient();
    }
    , [id]);

  const GenderIcon =
    patient?.gender === Gender.Other
      ? TransgenderIcon
      : patient?.gender === Gender.Female
        ? FemaleIcon
        : MaleIcon;

  if (patient === undefined) {
    return <div>loading....</div>
  }

  return (
    <div className="App">
      <Box>
        <Typography
          align="center"
          variant="h6"
        >
          Patient details
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
        >
          {patient?.name}
          <GenderIcon/>
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          gutterBottom
        >
          ssn: {patient?.ssn}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          gutterBottom
        >
          occupation: {patient?.occupation}
        </Typography>
      </Box>
    </div>
  );
};

export default PatienDetailPage;
