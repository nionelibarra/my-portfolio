import {defineField, defineType} from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Main Header',
      type: 'string',
    }),
    defineField({
      name: 'subheader',
      title: 'Sub Header',
      type: 'string',
    }),
    defineField({
      name: 'techstack',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'aboutmeheader',
      title: 'About Me Header',
      type: 'text',      
    }),
    defineField({
      name: 'aboutmesubheader',
      title: 'About Me Sub Header',
      type: 'text',      
    }),
    defineField({
      name: 'socialmediaaccounts',
      title: 'Social Media Accounts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            },
            {
              name: 'socialmedianame',
              title: 'Social Media Name',
              type: 'string',              
            },
            {
              name: 'username',
              title: 'Username',
              type: 'string',              
            },
          ],
        },
      ],
    }),
  ],
  
})
