'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the schema for a single question with user's answer
const ScoredQuestionSchema = z.object({
  id: z.string(),
  questionText: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
  isCorrect: z.boolean(),
  feedback: z.string().describe('Provide brief, constructive feedback for incorrect answers, explaining why the correct answer is right.'),
});

// Define the schema for the test scoring input
export const PteReadingTestInputSchema = z.object({
  questions: z.array(z.object({
      id: z.string(),
      questionText: z.string(),
      userAnswer: z.string(),
      correctAnswer: z.string(),
  })),
});
export type PteReadingTestInput = z.infer<typeof PteReadingTestInputSchema>;


// Define the schema for the test scoring output
export const PteReadingTestOutputSchema = z.object({
  overallScore: z.number().describe('The overall score as a percentage (0-100).'),
  generalFeedback: z.string().describe('Provide one or two sentences of overall feedback based on performance.'),
  results: z.array(ScoredQuestionSchema),
});
export type PteReadingTestOutput = z.infer<typeof PteReadingTestOutputSchema>;

// Define the AI prompt for scoring
const pteReadingScoringPrompt = ai.definePrompt({
  name: 'pteReadingScoringPrompt',
  input: { schema: PteReadingTestInputSchema },
  output: { schema: PteReadingTestOutputSchema },
  prompt: `You are an expert PTE (Pearson Test of English) examiner. Your task is to score a multiple-choice reading test.

For each question provided in the input, you must:
1.  Compare the 'userAnswer' to the 'correctAnswer'.
2.  Set 'isCorrect' to true if they match, and false otherwise.
3.  If the answer is incorrect, provide a brief, helpful 'feedback' explaining why the correct answer is the right choice based on the question. If correct, the feedback should be a short, positive confirmation like "Correct!".
4.  After evaluating all questions, calculate the 'overallScore' as a percentage of correct answers.
5.  Provide some 'generalFeedback' in one or two sentences, encouraging the user and suggesting what to focus on next.

Here is the test data:
{{{JSON.stringify(questions)}}}
`,
});

// Define the Genkit flow for scoring
const scorePteReadingFlow = ai.defineFlow(
  {
    name: 'scorePteReadingFlow',
    inputSchema: PteReadingTestInputSchema,
    outputSchema: PteReadingTestOutputSchema,
  },
  async (testData) => {
    const { output } = await pteReadingScoringPrompt(testData);
    if (!output) {
        throw new Error('AI failed to generate a score.');
    }
    return output;
  }
);

// Export a wrapper function to be used as a server action
export async function scorePteReadingTest(
  input: PteReadingTestInput
): Promise<PteReadingTestOutput> {
  return await scorePteReadingFlow(input);
}
