import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  // console.log(`ページのID${id}`);
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${id}` } });
  // console.log(`ページのデータ${data}`);
  return {
    props: {
      blog: data.contents, // contentsひつよう
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

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <h2>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </h2>
            <ul className={styles.tag_list}>
              <li>
                <Link href={`/category/${blog.category && blog.category.id}`}>
                  {blog.category && blog.category.name}
                </Link>
              </li>
            </ul>
            <small className={styles.updatedAt}>{blog.updatedAt}更新</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
