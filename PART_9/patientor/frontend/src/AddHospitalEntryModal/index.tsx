import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { EntryFormValues } from './AddHospitalEntryForm';

interface Props {
    modalHospitalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddHospitalEntryModal = ({ modalHospitalOpen, onClose,onSubmit,error }: Props) => (
  <Modal open={modalHospitalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Hospital Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHospitalEntryModal;