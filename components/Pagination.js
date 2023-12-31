import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export const Pagination = ({ totalCount, pageId }) => {
  const PER_PAGE = 3;

  /* １：rangeの引数に(start, end)を与えて、その値を元に配列を作成します。
これで、totalCountが20でPER_PAGEが5とすると(20 / 5)で4が返ります。
これはページネーションのリスト数になります。
*/
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  // const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <ul className={styles.pagination_list}>
      {/* ２：rangeで作成した配列をmapして各数値を取り出します。 */}
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={pageId === `${number}` ? styles.active : ""}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
