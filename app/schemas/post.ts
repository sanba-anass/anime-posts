import {defineField, defineType} from 'sanity'
export default defineType({
  type: 'document',
  name: 'post',
  title: 'Post',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    }),
    defineField({
      type: 'array',
      of: [{type: 'block'}],
      name: 'body',
      title: 'Body',
    }),
    defineField({
      type: 'number',
      name: 'likes',
      title: 'Likes',
    }),
  ],
  initialValue: {
    likes: 0,
  },
})
