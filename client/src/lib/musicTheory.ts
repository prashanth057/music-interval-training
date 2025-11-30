export const ROOT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;
export type RootNote = typeof ROOT_NOTES[number];

export interface Interval {
  name: string;
  semitones: number;
  displayName: string;
}

export const INTERVALS: Interval[] = [
  { name: '1', semitones: 0, displayName: 'Root (1)' },
  { name: '♭2', semitones: 1, displayName: '♭2 (minor 2nd)' },
  { name: '2', semitones: 2, displayName: '2 (major 2nd)' },
  { name: '♭3', semitones: 3, displayName: '♭3 (minor 3rd)' },
  { name: '3', semitones: 4, displayName: '3 (major 3rd)' },
  { name: '4', semitones: 5, displayName: '4 (perfect 4th)' },
  { name: '♯4', semitones: 6, displayName: '♯4 (tritone)' },
  { name: '♭5', semitones: 6, displayName: '♭5 (tritone)' },
  { name: '5', semitones: 7, displayName: '5 (perfect 5th)' },
  { name: '♯5', semitones: 8, displayName: '♯5 (augmented 5th)' },
  { name: '♭6', semitones: 8, displayName: '♭6 (minor 6th)' },
  { name: '6', semitones: 9, displayName: '6 (major 6th)' },
  { name: '♭7', semitones: 10, displayName: '♭7 (minor 7th)' },
  { name: '7', semitones: 11, displayName: '7 (major 7th)' },
  { name: '♭9', semitones: 1, displayName: '♭9 (flat nine)' },
  { name: '9', semitones: 2, displayName: '9 (nine)' },
  { name: '♯9', semitones: 3, displayName: '♯9 (sharp nine)' },
  { name: '11', semitones: 5, displayName: '11 (eleven)' },
  { name: '♯11', semitones: 6, displayName: '♯11 (sharp eleven)' },
  { name: '♭13', semitones: 8, displayName: '♭13 (flat thirteen)' },
  { name: '13', semitones: 9, displayName: '13 (thirteen)' },
];

export const QUIZ_INTERVALS = INTERVALS.filter(i => i.name !== '1');

export function getNoteAtInterval(root: RootNote, semitones: number): RootNote {
  const rootIndex = ROOT_NOTES.indexOf(root);
  return ROOT_NOTES[(rootIndex + semitones) % 12];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export interface QuizQuestion {
  id: string;
  rootNote: RootNote;
  interval: Interval;
  correctAnswer: string;
  options: string[];
}

export function generateQuestion(): QuizQuestion {
  const rootNote = ROOT_NOTES[Math.floor(Math.random() * ROOT_NOTES.length)];
  const interval = QUIZ_INTERVALS[Math.floor(Math.random() * QUIZ_INTERVALS.length)];
  
  const correctAnswer = getNoteAtInterval(rootNote, interval.semitones);
  
  const wrongOptions = ROOT_NOTES.filter(n => n !== correctAnswer);
  const selectedWrong = shuffleArray([...wrongOptions]).slice(0, 3);
  const options = shuffleArray([correctAnswer, ...selectedWrong]);
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    rootNote,
    interval,
    correctAnswer,
    options
  };
}
