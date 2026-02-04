'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating hero section headlines and sub-headlines.
 *
 * It exports:
 * - `generateHeroHeadlines`: An async function to generate headline options.
 * - `HeroHeadlinesInput`: The input type for the function.
 * - `HeroHeadlinesOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HeroHeadlinesInputSchema = z.object({
  theme: z.string().describe('The theme or focus of the headlines, such as "excellence" or "character building".'),
});
export type HeroHeadlinesInput = z.infer<typeof HeroHeadlinesInputSchema>;

const HeroHeadlinesOutputSchema = z.object({
  headlines: z.array(
    z.object({
      headline: z.string().describe('A catchy and impactful headline.'),
      subHeadline: z.string().describe('A supporting sub-headline that elaborates on the headline.'),
    })
  ).describe('An array of headline and sub-headline options.'),
});
export type HeroHeadlinesOutput = z.infer<typeof HeroHeadlinesOutputSchema>;

export async function generateHeroHeadlines(input: HeroHeadlinesInput): Promise<HeroHeadlinesOutput> {
  return generateHeroHeadlinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'heroHeadlinesPrompt',
  input: {schema: HeroHeadlinesInputSchema},
  output: {schema: HeroHeadlinesOutputSchema},
  prompt: `You are a creative copywriter specializing in educational branding. Generate 3 distinct options for hero section headlines and sub-headlines for an education foundation website. The headlines should be catchy and impactful, emphasizing {{{theme}}}. The sub-headlines should provide additional context and support the main headline.\n\nEnsure that the generated headlines and sub-headlines are suitable for a top-tier global educational institution and convey a sense of excellence and character building.\n\nFormat the output as a JSON array of objects, each containing a 'headline' and a 'subHeadline' field.`,
});

const generateHeroHeadlinesFlow = ai.defineFlow(
  {
    name: 'generateHeroHeadlinesFlow',
    inputSchema: HeroHeadlinesInputSchema,
    outputSchema: HeroHeadlinesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
