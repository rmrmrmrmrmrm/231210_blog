import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

//SSG
export const getStaticProps = async (context) => {
  //urlからid取得
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });
  console.log(`ページのID${id}`);
  console.log(`ページのデータ${data}`);
  return {
    props: {
      blog: data,
    },
  };
};

// ダイナミックルーティングに必要な設定 SSG設定
export const getStaticPaths = async () => {
  //公式ドキュメント（getStaticPaths）https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false, //パスがなければ404を表示。これがないとエラーになる
  };
};

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      {/* HTMLを整形 */}
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
    </main>
  );
}
