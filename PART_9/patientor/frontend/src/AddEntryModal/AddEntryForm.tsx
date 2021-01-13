import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as yup from 'yup';

import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';


export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues ) => void;
    onCancel: () => void;
  }
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue()
  
    return (
      <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: 'HealthCheck',
        healthCheckRating: 0,
        diagnosisCodes: []
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
        healthCheckRating: yup.number().positive().integer().min(0).max(2)
        .required('This Field is required'),
        diagnosisCodes: yup.array()
        .required('This Field is required'),
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
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
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

  export default AddEntryForm;