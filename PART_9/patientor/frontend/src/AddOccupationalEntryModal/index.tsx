import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalEntryForm, { EntryFormValues } from './AddOccupationalEntryForm';

interface Props {
  modalOccupationalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddOccupationalEntryModal = ({ modalOccupationalOpen, onClose,onSubmit,error }: Props) => (
  <Modal open={modalOccupationalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Occupational Health Care Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOccupationalEntryModal;