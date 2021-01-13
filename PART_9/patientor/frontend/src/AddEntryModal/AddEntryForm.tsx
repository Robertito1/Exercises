import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
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
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!values.specialist) {
          errors.ssn = requiredError;
        }
        if (!values.type) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.description) {
          errors.occupation = requiredError;
        }
        if (!values.healthCheckRating) {
            errors.occupation = requiredError;
        }
        if (!values.diagnosisCodes) {
            errors.occupation = requiredError;
        }
        return errors;
      }}
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