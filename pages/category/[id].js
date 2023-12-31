import Layout from "@/components/Layout";
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";

// 動的ページ作成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content) => `/category/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

// データ取得
export const getStaticProps = async (context) => {
  // ページidを取得
  const id = context.params.id;
  // ページカテゴリに一致するでーたを取得
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}` },
    queries: { offset: 0, limit: 3 }, //ページャー
  });
  // カテゴリデータを取得
  const cate = await client.get({ endpoint: "categories" });
  return {
    props: {
      blog: data.contents, // contentsひつよう
      totalCount: data.totalCount, //ページャー
      category: cate.contents, //カテゴリ
    },
  };
};

export default function BlogId({ blog, totalCount, category }) {
  return (
    <>
      <Layout category={category}>
        <article className={styles.article_box}>
          <ul className={styles.article_list}>
            {blog.map((blog) => (
              <li key={blog.id}>
                <h2>
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </h2>
                <div className={styles.category_btn}>
                  <Link href={`/category/${blog.category && blog.category.id}`}>
                    {blog.category && blog.category.name}
                  </Link>
                </div>
                <ul className={styles.tag_list}>
                  <li>
                    <Link href="">#タグ名</Link>
                  </li>
                  <li>
                    <Link href="">#タグ名</Link>
                  </li>
                  <li>
                    <Link href="">#タグ名</Link>
                  </li>
                </ul>
                <small className={styles.updatedAt}>{blog.updatedAt}更新</small>
              </li>
            ))}
          </ul>
          <Pagination totalCount={totalCount} />
        </article>
      </Layout>
    </>
  );
}
