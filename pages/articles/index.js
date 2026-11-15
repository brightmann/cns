import { getAllFiles } from '../../lib/posts-md';
import Layout from '../../components/layout';
import Pagelink from '../../components/pagelink';
import Pagination from '../../components/pagination';
import Head from 'next/head';

const postsDir = 'articles';
const postsPerPage = 5;

export default function ArticleIndex({ postData, totalPages }) {

  return (

    <Layout hero="phone.jpg">

      <Head>
        <title>Article index</title>
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

      <Pagination currentPage={ 1 } totalPages={ totalPages } basePath="/articles" />

    </Layout>

  );

}


// fetch first page of article posts
export async function getStaticProps() {

  const all = await getAllFiles(postsDir);
  const totalPages = Math.max(1, Math.ceil(all.length / postsPerPage));

  return {
    props: {
      postData: all.slice(0, postsPerPage),
      totalPages
    }
  }

}
