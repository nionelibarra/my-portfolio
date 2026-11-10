import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_ID

export const client = projectId
  ? createClient({
      projectId,
      dataset: 'production',
      apiVersion: '2024-05-16',
      useCdn: false,
    })
  : null
