import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";
import Header from "@/components/Header";

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  // カテゴリに一致する記事を検索
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}` },
    queries: { offset: 0, limit: 3 }, //ページャー
  });
  return {
    props: {
      blog: data.contents, // contentsひつよう
      totalCount: data.totalCount, //ページャー
    },
  };
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content) => `/category/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default function BlogId({ blog, totalCount }) {
  return (
    <>
      <Header />
      <div className={styles.main}>
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
      </div>
    </>
  );
}
