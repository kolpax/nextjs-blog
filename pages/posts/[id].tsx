import Head from "next/head";
import Layout from "../../components/layout";
import {
  getAllPostIds,
  getPostData,
  PostData,
  PostDataWithContent,
  PostRouteParams,
} from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

interface Props {
  postData: PostDataWithContent;
}

export default function Post({ postData }: Props): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      </article>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

interface StaticProps {
  params: PostRouteParams;
}

export async function getStaticProps({ params }: StaticProps): Promise<{
  props: Props;
}> {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
