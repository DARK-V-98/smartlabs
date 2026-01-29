import { z } from 'zod';

// --- Summarize Written Text ---
export const PteSummarizeWrittenTextInputSchema = z.object({
  passage: z.string().describe('The original text passage that the user was asked to summarize.'),
  summary: z.string().max(75, 'Summary must be between 5 and 75 words.').min(5, 'Summary must be between 5 and 75 words.').describe('The user\'s one-sentence summary.'),
});
export type PteSummarizeWrittenTextInput = z.infer<typeof PteSummarizeWrittenTextInputSchema>;

export const PteSummarizeWrittenTextOutputSchema = z.object({
    contentScore: z.number().min(0).max(2).describe("Score for summarizing the main points of the passage."),
    formScore: z.number().min(0).max(1).describe("Score for the form (a single sentence, between 5 and 75 words)."),
    grammarScore: z.number().min(0).max(2).describe("Score for correct grammatical structures."),
    vocabularyScore: z.number().min(0).max(2).describe("Score for appropriate choice of words."),
    overallScore: z.number().min(0).max(7).describe("The total score for the task."),
    feedback: z.string().describe("Specific, constructive feedback on content, form, grammar, and vocabulary."),
});
export type PteSummarizeWrittenTextOutput = z.infer<typeof PteSummarizeWrittenTextOutputSchema>;
