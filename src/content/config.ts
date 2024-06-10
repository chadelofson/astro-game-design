import { z, defineCollection } from "astro:content"

const scriptingCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
})

export const collections = {
  scripting: scriptingCollection,
}
