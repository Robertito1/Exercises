import React from 'react';
import { Segment, Icon } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthCareEntry: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return (
    <Segment>
    <h3>{entry.date}<Icon name="stethoscope" size="big"/> <span>{entry.employerName}</span></h3>
    <p>{entry.description}</p>
    </Segment>
  )
}

export default OccupationalHealthCareEntry;