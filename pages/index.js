import styles from "../styles/Home.module.scss";
import { client } from "../libs/client";
import Link from "next/link";
import { Pagination } from "@/components/pagination";

//SSG ビルド　更新の少ないページ（SSR　更新の多いページ）
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const cate = await client.get({ endpoint: "categories" });
  //console.log(data);
  // console.log(cate);
  return {
    props: {
      blog: data.contents,
      category: cate.contents,
    },
  };
};

export default function Home({ blog, category }) {
  return (
    <>
      {/* へっだー */}
      <header>
        <div className={styles.header_inner}>
          <h1>
            <Link href="/">231210-blog.vercel.app</Link>
          </h1>
        </div>
      </header>
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
                  <li key={category.id}>
                    <Link href={`/category/${category.id}`}>#タグ名</Link>
                  </li>
                  <li key={category.id}>
                    <Link href={`/category/${category.id}`}>#タグ名</Link>
                  </li>
                  <li key={category.id}>
                    <Link href={`/category/${category.id}`}>#タグ名</Link>
                  </li>
                </ul>
                <small className={styles.updatedAt}>{blog.updatedAt}更新</small>
              </li>
            ))}
          </ul>
        </article>
        {/* かてごり */}
        <article className={styles.category_box}>
          <h2>category</h2>
          <ul className={styles.category_list}>
            {category.map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}
