import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'holidayPackage',
  title: 'Holiday Package',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Package ID',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Cruise', value: 'cruise'},
          {title: 'Tour', value: 'tour'},
          {title: 'South India', value: 'southIndia'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'destination',
      title: 'Primary Destination',
      type: 'string',
    }),
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', type: 'number', title: 'Day'},
            {name: 'port', type: 'string', title: 'Port / Location'},
            {name: 'activity', type: 'text', title: 'Activity'},
          ],
        },
      ],
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'shows',
      title: 'Shows / Entertainment',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'ship',
      title: 'Ship / Transport',
      type: 'string',
    }),
    defineField({
      name: 'otherDetails',
      title: 'Important Information',
      type: 'text',
    }),
  ],
})
