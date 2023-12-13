import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export default function Header() {
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
    </>
  );
}
