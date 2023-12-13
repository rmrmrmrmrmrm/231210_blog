import Name from "components/name";

export default function Name() {
  return <></>;
}

//ページネーション
//components/Pagination.js
import Link from "next/link";

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  /* １：rangeの引数に(start, end)を与えて、その値を元に配列を作成します。
これで、totalCountが20でPER_PAGEが5とすると(20 / 5)で4が返ります。
これはページネーションのリスト数になります。
*/
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul>
      {/* ２：rangeで作成した配列をmapして各数値を取り出します。 */}
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};

<Pagination totalCount={20} />;
