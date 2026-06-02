import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook URL'},
        {name: 'twitter', type: 'url', title: 'Twitter URL'},
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
      ],
    }),
  ],
})
