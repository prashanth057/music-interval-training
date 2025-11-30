export const ROOT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;
export type RootNote = typeof ROOT_NOTES[number];

export interface Interval {
  name: string;
  semitones: number;
  displayName: string;
  isExtended: boolean;
}

export const INTERVALS_WITHIN_OCTAVE: Interval[] = [
  { name: '♭II', semitones: 1, displayName: '♭II (minor 2nd)', isExtended: false },
  { name: 'II', semitones: 2, displayName: 'II (major 2nd)', isExtended: false },
  { name: '♭III', semitones: 3, displayName: '♭III (minor 3rd)', isExtended: false },
  { name: 'III', semitones: 4, displayName: 'III (major 3rd)', isExtended: false },
  { name: 'IV', semitones: 5, displayName: 'IV (perfect 4th)', isExtended: false },
  { name: '♯IV', semitones: 6, displayName: '♯IV (tritone)', isExtended: false },
  { name: '♭V', semitones: 6, displayName: '♭V (tritone)', isExtended: false },
  { name: 'V', semitones: 7, displayName: 'V (perfect 5th)', isExtended: false },
  { name: '♯V', semitones: 8, displayName: '♯V (augmented 5th)', isExtended: false },
  { name: '♭VI', semitones: 8, displayName: '♭VI (minor 6th)', isExtended: false },
  { name: 'VI', semitones: 9, displayName: 'VI (major 6th)', isExtended: false },
  { name: '♭VII', semitones: 10, displayName: '♭VII (minor 7th)', isExtended: false },
  { name: 'VII', semitones: 11, displayName: 'VII (major 7th)', isExtended: false },
];

export const EXTENDED_INTERVALS: Interval[] = [
  { name: '♭9', semitones: 1, displayName: '♭9 (flat nine)', isExtended: true },
  { name: '9', semitones: 2, displayName: '9 (nine)', isExtended: true },
  { name: '♯9', semitones: 3, displayName: '♯9 (sharp nine)', isExtended: true },
  { name: '11', semitones: 5, displayName: '11 (eleven)', isExtended: true },
  { name: '♯11', semitones: 6, displayName: '♯11 (sharp eleven)', isExtended: true },
  { name: '♭13', semitones: 8, displayName: '♭13 (flat thirteen)', isExtended: true },
  { name: '13', semitones: 9, displayName: '13 (thirteen)', isExtended: true },
];

export const ALL_INTERVALS = [...INTERVALS_WITHIN_OCTAVE, ...EXTENDED_INTERVALS];

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
  
  const useExtended = Math.random() < 0.15;
  const intervalPool = useExtended ? EXTENDED_INTERVALS : INTERVALS_WITHIN_OCTAVE;
  const interval = intervalPool[Math.floor(Math.random() * intervalPool.length)];
  
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
