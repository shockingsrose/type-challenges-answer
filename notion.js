const { Client } = require('@notionhq/client')

const { NOTION_DATABASE_ID, NOTION_API_KEY } = process.env

const notion = new Client({ auth: NOTION_API_KEY })

;(async () => {
  const { results } = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
  })

  const pageId = results[0].id

  await notion.pages.update({
    page_id: pageId,
    properties: {
      'TypeScript Challenge': {
        checkbox: true,
      },
    },
  })
})()
