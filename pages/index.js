import styles from "../styles/Home.module.scss";
import { client } from "../libs/client";
import Link from "next/link";

//SSG ビルド　更新の少ないページ（SSR　更新の多いページ）
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  console.log(data);
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function Home({ blog }) {
  return (
    <>
      <div className={styles.main}>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>{blog.title}</Link>
            <p>{blog.body}</p>
          </li>
        ))}
      </div>
    </>
  );
}
