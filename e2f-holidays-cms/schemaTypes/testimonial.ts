import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial (Reviews)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'image',
      title: 'Customer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
