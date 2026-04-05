import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notesCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform((str) => new Date(str)),
    category: z.enum(['대사 로직', '영양소 함수', '팩트 체크', '식단 가이드']),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  notes: notesCollection,
};
