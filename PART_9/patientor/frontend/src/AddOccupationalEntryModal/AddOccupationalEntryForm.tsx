import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as yup from 'yup';

import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';


export type EntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues ) => void;
    onCancel: () => void;
  }
const AddOccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue()
  
    return (
      <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: ""
        },
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
        sickLeave: yup.object({
            startDate: yup.date(),
            endDate:  yup.string()
        }),
        diagnosisCodes: yup.array()
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
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />
            <Field
              label="SickLeaveStartDate"
              placeholder="SickLeaveStartDate"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="SickLeaveEndDate"
              placeholder="SickLeaveEndDate"
              name="sickLeave.endDate"
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

  export default AddOccupationalEntryForm;