import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export default function Footer({ category }) {
  return (
    <>
      {/* ふったー */}
      <footer>
        {/* かてごり*/}
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
      </footer>
    </>
  );
}
