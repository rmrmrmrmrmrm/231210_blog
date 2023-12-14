import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_inner}>
          <h1>
            <Link href="/">blog.vercel.app</Link>
          </h1>
        </div>
      </header>
    </>
  );
}
