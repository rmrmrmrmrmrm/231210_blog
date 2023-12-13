import styles from "@/styles/Home.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children, category }) {
  return (
    <>
      {/* へっだー */}
      <Header />
      {/* こんてんつ */}
      <div className={styles.main}>{children}</div>
      {/* ふったー */}
      <Footer category={category} />
    </>
  );
}
