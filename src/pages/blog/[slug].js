import { getAllPostsSlugs, getOnePostBySlug, getLastPosts } from '../../lib/api'
import { useRouter } from 'next/router'
import DefineMetatagsSEO from '../../helpers/defineMetatagsSEO'

import PostTemplate from '../../components/template/post-template'

const Post = ({ post = {}, lastPosts }) => {
  const router = useRouter()
  if (router.isFallback) return null

  return (
    <>
      <DefineMetatagsSEO seo={post} router={router} image={post.heroCover.responsiveImage.src} />
      <PostTemplate post={post} locale={router.locale} lastPosts={lastPosts} router={router} />
    </>
  )
}
export default Post

export async function getStaticProps({ preview = false, locale, params }) {
  const post = await getOnePostBySlug(preview, locale, params?.slug)
  const lastPosts = post?.tags?.id ? await getLastPosts(preview, locale, post?.tags?.id, post?.id) : []

  if (!post) {
    return {
      notFound: true
    }
  }
  return {
    props: { post, lastPosts }
  }
}

export async function getStaticPaths() {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  const englishPosts = await getAllPostsSlugs('en')
  const frenchPosts = await getAllPostsSlugs('fr')

  const fillPaths = (array) => {
    array.forEach((posts) => {
      posts.forEach(({ slug }) => {
        paths.push({
          params: {
            slug
          }
        })
      })
    })
  }
  fillPaths([englishPosts, frenchPosts])

  return { paths, fallback: true }
}
