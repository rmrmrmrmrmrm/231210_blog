import Layout from "@/components/Layout";
import { Pagination } from "@/components/Pagination";
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

// ページ件数
const PER_PAGE = 3;

// 動的ページ作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });
  /* 
  range という関数を使って配列を作成します。
  PER_PAGEが5なので
  totalCountが20の場合は4つのページ(例: blog/page/1、blog/page/2...)が作成できます。
   */
  // const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const range = (start, end) => {
    // startはend以下でなければならない
    if (start > end) {
      throw new Error("Invalid range: start should be less than or equal to end");
    }
    return [...Array(end - start + 1)].map((_, i) => start + i);
  };
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);
  return {
    paths,
    fallback: false,
  };
};

// データ取得
export const getStaticProps = async (context) => {
  // ページidを取得
  const id = context.params.id;
  // ページidに関するページデータを取得
  const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 3, limit: 3 } });
  // カテゴリデータを取得
  const cate = await client.get({ endpoint: "categories" });
  return {
    props: {
      pageId: id,
      blog: data.contents,
      totalCount: data.totalCount,
      category: cate.contents, //カテゴリ
    },
  };
};

export default function PageId({ blog, totalCount, category, pageId }) {
  return (
    <>
      <Layout category={category}>
        {/* 記事 */}
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
          <Pagination totalCount={totalCount} pageId={pageId} />
        </article>
      </Layout>
    </>
  );
}
