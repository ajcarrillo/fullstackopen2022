import axios from "axios";
import { Box, Button, Typography } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { Entry, Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male"
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetail from '../components/EntryDetail';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

export const emptyPatient: Patient = {
  id: "none",
  name: "none",
  occupation: "none",
  gender: Gender.Other,
  ssn: "none",
  dateOfBirth: "none",
  entries: [],
};

const PatienDetailPage = () => {
  const [patient, setPatient] = useState<Patient>(emptyPatient);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
    patient.gender === Gender.Other
      ? TransgenderIcon
      : patient.gender === Gender.Female
        ? FemaleIcon
        : MaleIcon;

  if (patient.id === "none") {
    return <div>loading....</div>
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      )

      const newPatient = { ...newEntry }
      setPatient(newPatient)
      closeModal()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
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
          {patient.name}
          <GenderIcon/>
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          gutterBottom
        >
          ssn: {patient.ssn}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          gutterBottom
        >
          occupation: {patient.occupation}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
        >Entries</Typography>
      </Box>
      <Box>
        {patient.entries?.map((entry: Entry) => <EntryDetail
          key={entry.id}
          entry={entry}
        />)}
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        onSubmit={submitNewEntry}
      ></AddEntryModal>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openModal()}
      >
        Add entry
      </Button>
    </div>
  );
};

export default PatienDetailPage;
