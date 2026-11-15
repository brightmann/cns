import { getAllFiles } from '../../../lib/posts-md';
import Layout from '../../../components/layout';
import Pagelink from '../../../components/pagelink';
import Pagination from '../../../components/pagination';
import Head from 'next/head';

const postsDir = 'articles';
const postsPerPage = 5;

export default function ArticlePage({ postData, currentPage, totalPages }) {

  return (

    <Layout hero="phone.jpg">

      <Head>
        <title>Article index — page { currentPage }</title>
        <meta name="description" content="A list of articles published on this site." />
      </Head>

      <h1>Article index</h1>

      <aside className="pagelist">

        { postData.map(post => (
          <Pagelink
            key={ post.id }
            postsdir={ postsDir }
            id={ post.id }
            title={ post.title }
            description={ post.description }
            dateymd={ post.dateYMD }
            datefriendly={ post.dateFriendly }
          />
        ))}

      </aside>

      <Pagination currentPage={ currentPage } totalPages={ totalPages } basePath="/articles" />

    </Layout>

  );

}


// pages 2..N only; page 1 is /articles (see next.config.js redirect)
export async function getStaticPaths() {

  const
    all = await getAllFiles(postsDir),
    totalPages = Math.ceil(all.length / postsPerPage),
    paths = [];

  for (let p = 2; p <= totalPages; p++) {
    paths.push({ params: { page: String(p) } });
  }

  return { paths, fallback: false };

}


// fetch one page of article posts
export async function getStaticProps({ params }) {

  const
    all = await getAllFiles(postsDir),
    totalPages = Math.max(1, Math.ceil(all.length / postsPerPage)),
    currentPage = parseInt(params.page, 10),
    start = (currentPage - 1) * postsPerPage;

  return {
    props: {
      postData: all.slice(start, start + postsPerPage),
      currentPage,
      totalPages
    }
  }

}
