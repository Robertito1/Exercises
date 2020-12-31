import diagnosesData from '../../data/diagnosesData';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnosesData;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};