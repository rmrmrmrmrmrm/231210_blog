import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Pagination } from "@/components/Pagination";

//SSG ビルド　更新の少ないページ（SSR　更新の多いページ）
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: 3 }, //ページャー
  });
  //console.log(data);
  const cate = await client.get({ endpoint: "categories" });
  //console.log(cate);
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount, //ページャー
      category: cate.contents,
    },
  };
};

export default function Home({ blog, totalCount, category }) {
  return (
    <>
      <Header />
      {/* こんてんつ */}
      <div className={styles.main}>
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
          <Pagination totalCount={totalCount} />
        </article>
      </div>
      <Footer category={category} />
    </>
  );
}
