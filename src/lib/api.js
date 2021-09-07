const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

/* FRAGMENTS */
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

const svgFragment = `
  fragment svgFieldFragment on FileField {
    alt
    filename
    url
    filename
    title
    height
    width
  }
`

const referenceFragment = `
  fragment ReferenceRecordFragment on ReferenceRecord {
    id
    title
    subtitle
    slug
    cardCover {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

/* PAGE HOME */
export async function getAllTestimonialsForHome(preview, locale) {
  const data = await fetchAPI(
    `
      {
        home(locale: ${locale}) {
          temoignages {
            footer
            content
            img {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            id
          }
        }
      }  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.home
}

export async function getLastReferences(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allReferences(locale: ${locale}, orderBy: _createdAt_DESC, first: "3") {
          ...ReferenceRecordFragment
        }
      }
      ${referenceFragment}
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.allReferences
}

/* PAGE REFERENCES */
export async function getAllReferences(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allReferences(locale: ${locale}, orderBy: _createdAt_DESC) {
          ...ReferenceRecordFragment
        }
      }
      ${referenceFragment}
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.allReferences
}

export async function getAllRegies(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allRegies(locale: ${locale}, orderBy: _createdAt_ASC) {
          id
          mission
          nomEntreprise
          img {
            responsiveImage {
              ...responsiveImageFragment
            }
          }
        }
      }
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.allRegies
}

/* PAGE AGENCE  */
export async function getTeamMembers(preview, locale) {
  const data = await fetchAPI(
    `
      {
        agence(locale: ${locale}){
          membres {
            id
            subtitle
            title
            citation
            cardCover {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.agence
}

export async function getGalleryImg(preview, locale) {
  const data = await fetchAPI(
    `
      {
        agence(locale: ${locale}){
          gallerie {
            responsiveImage {
              ...responsiveImageFragment
            }
          }
        }
      }
  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.agence
}

/* PAGE BLOG */
export async function getBlog(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allPosts(locale: ${locale}, orderBy: date_DESC) {
          date
          slug
          title
          content
          author {
            name
          }
          heroCover {
            responsiveImage {
              ...responsiveImageFragment
            }
          }
          tags {
            name
            slug
            id
          }
        },
        allTags(locale: ${locale}) {
          name
          id
          slug
        }
      }
  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data
}

/* EXPERTISES */
export async function getExpertisesByField(preview, locale, field) {
  const data = await fetchAPI(
    `
      {
        allExpertises(filter: {expertise: {matches: {pattern: "${field}"}}}, locale: ${locale}) {
          title
          id
          description
          icon {
            ...svgFieldFragment
          }
        }
      }
  
      ${svgFragment}
    `,
    { preview }
  )
  return data?.allExpertises
}