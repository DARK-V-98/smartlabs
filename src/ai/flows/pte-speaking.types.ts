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

// --- Repeat Sentence ---
export const PteRepeatSentenceInputSchema = z.object({
  originalSentence: z.string().describe('The original sentence that the user was asked to repeat.'),
  audioDataUri: z.string().describe("A recording of the user repeating the sentence, as a data URI."),
});
export type PteRepeatSentenceInput = z.infer<typeof PteRepeatSentenceInputSchema>;

export const PteRepeatSentenceOutputSchema = z.object({
    transcript: z.string().describe("The text transcribed from the user's audio recording."),
    contentScore: z.number().min(0).max(90).describe("Score based on the number of correct words compared to the original sentence."),
    pronunciationScore: z.number().min(0).max(90).describe("Score based on pronunciation clarity."),
    fluencyScore: z.number().min(0).max(90).describe("Score based on speech fluency and rhythm."),
    feedback: z.string().describe("Specific feedback on errors."),
    overallScore: z.number().min(0).max(90).describe("The overall weighted score."),
});
export type PteRepeatSentenceOutput = z.infer<typeof PteRepeatSentenceOutputSchema>;


// --- Describe Image ---
export const PteDescribeImageInputSchema = z.object({
  imageUrl: z.string().url().describe('The URL of the image the user needs to describe.'),
  audioDataUri: z.string().describe("A recording of the user describing the image, as a data URI."),
});
export type PteDescribeImageInput = z.infer<typeof PteDescribeImageInputSchema>;

export const PteDescribeImageOutputSchema = z.object({
    transcript: z.string().describe("The text transcribed from the user's audio recording."),
    contentScore: z.number().min(0).max(90).describe("Score based on the relevance and completeness of the image description, including key elements, relationships, and implications."),
    pronunciationScore: z.number().min(0).max(90).describe("Score based on pronunciation clarity."),
    fluencyScore: z.number().min(0).max(90).describe("Score based on speech fluency."),
    feedback: z.string().describe("Specific feedback on content, pronunciation, and fluency."),
    overallScore: z.number().min(0).max(90).describe("The overall weighted score."),
});
export type PteDescribeImageOutput = z.infer<typeof PteDescribeImageOutputSchema>;

// --- Retell Lecture ---
export const PteRetellLectureInputSchema = z.object({
  lectureTranscript: z.string().describe('The transcript of the lecture the user listened to.'),
  audioDataUri: z.string().describe("A recording of the user retelling the lecture, as a data URI."),
});
export type PteRetellLectureInput = z.infer<typeof PteRetellLectureInputSchema>;

export const PteRetellLectureOutputSchema = z.object({
    transcript: z.string().describe("The text transcribed from the user's audio recording."),
    contentScore: z.number().min(0).max(90).describe("Score based on how well the user retold the main points of the lecture."),
    pronunciationScore: z.number().min(0).max(90).describe("Score based on pronunciation clarity."),
    fluencyScore: z.number().min(0).max(90).describe("Score based on speech fluency."),
    feedback: z.string().describe("Specific feedback on content, pronunciation, and fluency."),
    overallScore: z.number().min(0).max(90).describe("The overall weighted score."),
});
export type PteRetellLectureOutput = z.infer<typeof PteRetellLectureOutputSchema>;
