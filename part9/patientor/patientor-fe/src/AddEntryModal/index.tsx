import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit }: Props) => (
  <Dialog
    fullWidth={true}
    open={modalOpen}
    onClose={() => onClose()}
    scroll={'body'}
  >
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider/>
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
)

export default AddEntryModal;
