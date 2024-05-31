// FontAwesomeIconコンポーネントをインポートします。ここでは検索アイコンを使用するために、必要なアイコンを読み込んでいます。
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// SearchInputコンポーネントを定義します。このコンポーネントは検索入力フィールドとボタンを提供します。
export function SearchInput(props) {
  // セクションコンポーネントを返します。セクションには検索入力フィールドとボタンが表示されます。
  return (
    <section className="mb-10">
      {/* 検索入力フィールドを表示します。
          クラス名を使用して、スタイルを適用しています。
          プレースホルダーテキストを設定しています。 */}
      <input
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲を入力してください"
      />
      {/* 検索ボタンを表示します。
          クラス名を使用して、スタイルを適用しています。
          FontAwesomeIconコンポーネントを使用して、検索アイコンを表示しています。 */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}