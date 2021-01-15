import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as yup from 'yup';

import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';


export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues ) => void;
    onCancel: () => void;
  }
const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue()
  
    return (
      <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: 'Hospital',
        diagnosisCodes: [],
        discharge: {
            date: '',
            criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validationSchema={yup.object({
        date: yup.date()
        .required('The date is required'),
        specialist: yup.string()
        .required('This Field is required'),
        type: yup.string()
        .required('This Field is required'),
        description: yup.string()
        .required('This Field is required'),
        diagnosisCodes: yup.array()
        .required('This Field is required'),
        discharge: yup.object({
            date: yup.date()
            .required('The date is required'),
            criteria:  yup.string()
            .required('This Field is required'),
        })
      })}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="Date of Discharge"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria for Discharge"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Button type="button" floated='left' onClick={onCancel} color="red">
               Cancel
            </Button>
            <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
               Add
            </Button>             
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddHospitalEntryForm;