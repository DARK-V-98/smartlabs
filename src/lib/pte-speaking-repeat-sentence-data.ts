export interface SentenceData {
  id: string;
  text: string;
  audioSrc: string;
}

// NOTE: These audio files do not exist. You will need to add them to your /public/audio folder.
export const pteRepeatSentenceData: SentenceData[] = [
  { id: 'rs1', text: 'The university will seek a colossal renovation to the plain-looking theater.', audioSrc: '/audio/pte-rs-1.mp3' },
  { id: 'rs2', text: 'Please remember to bring a highlighter and your textbook to class next Thursday.', audioSrc: '/audio/pte-rs-2.mp3' },
  { id: 'rs3', text: 'The library is located on the north side of the campus.', audioSrc: '/audio/pte-rs-3.mp3' },
  { id: 'rs4', text: 'The financial report for the last quarter will be available this afternoon.', audioSrc: '/audio/pte-rs-4.mp3' },
  { id: 'rs5', text: 'Climate change is a global issue that requires immediate and collective action.', audioSrc: '/audio/pte-rs-5.mp3' },
];
