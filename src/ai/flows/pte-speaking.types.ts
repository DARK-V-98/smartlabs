import { z } from 'zod';

// Schema for the input to the PTE Read Aloud scoring flow
export const PteReadAloudInputSchema = z.object({
  text: z.string().describe('The original text passage that the user was asked to read.'),
  audioDataUri: z.string().describe("A recording of the user reading the text, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type PteReadAloudInput = z.infer<typeof PteReadAloudInputSchema>;

// Schema for the output of the PTE Read Aloud scoring flow
export const PteReadAloudOutputSchema = z.object({
    transcript: z.string().describe("The text transcribed from the user's audio recording."),
    contentScore: z.number().min(0).max(90).describe("Score based on the number of correct words compared to the original text."),
    pronunciationScore: z.number().min(0).max(90).describe("Score based on the clarity and correctness of pronunciation, rated on a native-like scale."),
    fluencyScore: z.number().min(0).max(90).describe("Score based on the smoothness, rhythm, and pace of speech."),
    feedback: z.string().describe("Specific, constructive feedback on errors in content, pronunciation, or fluency. Mention specific words that were mispronounced."),
    overallScore: z.number().min(0).max(90).describe("The overall weighted score for the Read Aloud task."),
});
export type PteReadAloudOutput = z.infer<typeof PteReadAloudOutputSchema>;
