export const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type RootNote = typeof ROOT_NOTES[number];

export const SCALE_TYPES = ['major', 'minor'] as const;
export type ScaleType = typeof SCALE_TYPES[number];

export const CHORD_TYPES = ['Major', 'minor', 'diminished', 'augmented'] as const;
export type ChordType = typeof CHORD_TYPES[number];

export const DEGREE_NAMES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'] as const;
export type DegreeName = typeof DEGREE_NAMES[number];

export const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
export const MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

export const MAJOR_SCALE_CHORD_TYPES: ChordType[] = ['Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'diminished'];
export const MINOR_SCALE_CHORD_TYPES: ChordType[] = ['minor', 'diminished', 'Major', 'minor', 'minor', 'Major', 'Major'];

export function getScaleNotes(root: RootNote, scaleType: ScaleType): RootNote[] {
  const rootIndex = ROOT_NOTES.indexOf(root);
  const intervals = scaleType === 'major' ? MAJOR_SCALE_INTERVALS : MINOR_SCALE_INTERVALS;
  
  return intervals.map(interval => ROOT_NOTES[(rootIndex + interval) % 12]);
}

export function getDiatonicChordType(scaleType: ScaleType, degree: number): ChordType {
  const chordTypes = scaleType === 'major' ? MAJOR_SCALE_CHORD_TYPES : MINOR_SCALE_CHORD_TYPES;
  return chordTypes[degree - 1];
}

export function getNoteAtDegree(root: RootNote, scaleType: ScaleType, degree: number): RootNote {
  const scaleNotes = getScaleNotes(root, scaleType);
  return scaleNotes[degree - 1];
}

export interface QuizQuestion {
  id: string;
  rootNote: RootNote;
  scaleType: ScaleType;
  degree: number;
  questionType: 'chord_type' | 'note_at_degree';
  correctAnswer: string;
  options: string[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuestion(): QuizQuestion {
  const rootNote = ROOT_NOTES[Math.floor(Math.random() * ROOT_NOTES.length)];
  const scaleType = SCALE_TYPES[Math.floor(Math.random() * SCALE_TYPES.length)];
  const degree = Math.floor(Math.random() * 7) + 1;
  const questionType = Math.random() > 0.5 ? 'chord_type' : 'note_at_degree';
  
  let correctAnswer: string;
  let options: string[];
  
  if (questionType === 'chord_type') {
    correctAnswer = getDiatonicChordType(scaleType, degree);
    options = shuffleArray([...CHORD_TYPES]);
  } else {
    correctAnswer = getNoteAtDegree(rootNote, scaleType, degree);
    const wrongOptions = ROOT_NOTES.filter(n => n !== correctAnswer);
    const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
    options = shuffleArray([correctAnswer, ...selectedWrong]);
  }
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    rootNote,
    scaleType,
    degree,
    questionType,
    correctAnswer,
    options
  };
}

export function formatDegreeSuffix(degree: number): string {
  if (degree === 1) return '1st';
  if (degree === 2) return '2nd';
  if (degree === 3) return '3rd';
  return `${degree}th`;
}

export function formatChordSymbol(note: RootNote, chordType: ChordType): string {
  switch (chordType) {
    case 'Major': return note;
    case 'minor': return `${note}m`;
    case 'diminished': return `${note}dim`;
    case 'augmented': return `${note}aug`;
    default: return note;
  }
}
