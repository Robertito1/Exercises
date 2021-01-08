import React from 'react';
import {Segment, Icon, SemanticCOLORS} from 'semantic-ui-react'
import { HealthCheckEntry } from '../types';

const selectHealthRatingIcon = (rating: number): SemanticCOLORS  => {
    switch(rating){
        case 0:
            return 'green';
        case 1:
            return 'yellow';
        case 2:
            return 'red';
        default:
            return 'black'
    }
}
const HealthCheckEntryComp: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  return (
      <Segment>
          <h3>{entry.date}<Icon name="user md" size="big"/></h3>
          <p>{entry.description}</p>
          <Icon name="heart" color={selectHealthRatingIcon(entry.healthCheckRating)}/>
      </Segment>
  )
}


export default HealthCheckEntryComp;