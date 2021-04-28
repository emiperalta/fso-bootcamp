import diaries from '../data/diaries';
import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
} from '../utils/types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, visibility, weather }) => ({
    id,
    date,
    visibility,
    weather,
  }));
};

const addEntry = (data: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...data,
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default { addEntry, findById, getEntries, getNonSensitiveEntries };
