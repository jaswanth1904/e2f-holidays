import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature (Why Choose Us)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Feature Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (e.g., Car, Hotel, Shield)',
      type: 'string',
    }),
  ],
})
