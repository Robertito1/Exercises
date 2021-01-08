import React from 'react';
import {Segment, Icon} from 'semantic-ui-react'
import { HospitalEntry } from '../types';

const HospitalEntryComp: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return (
    <Segment>
    <h3>{entry.date}<Icon name="hospital" size="big"/></h3>
      <p>{entry.description}</p>
    <p><b>Discharged:</b> {entry.discharge.date}</p>
    </Segment>
  )
}


export default HospitalEntryComp;