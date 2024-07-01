// @fortawesome/free-solid-svg-iconsパッケージから検索アイコン（faSearch）をインポートします
// このアイコンは、検索ボタンに表示されます
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// @fortawesome/react-fontawesomeパッケージからFontAwesomeIconコンポーネントをインポートします
// このコンポーネントは、FontAwesomeのアイコンをReactで簡単に使用するためのものです
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// SearchInputコンポーネントを定義します。このコンポーネントは検索入力フィールドとボタンを提供します。
export function SearchInput(props) {
  // セクションコンポーネントを返します。セクションには検索入力フィールドとボタンが表示されます。
  return (
    <section className='mb-10'>
      {/* 
        className の説明:
        mb-10: 下マージンを10ユニット設定し、次のセクションとの間隔を確保
      */}
      {/* 検索入力フィールドを表示します。
          プレースホルダーテキストを設定しています。
          入力値の変更イベントをpropsで受け取ったonInputChange関数にバインドしています。 */}
      <input
        onChange={props.onInputChange}
        className='bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none'
        placeholder='探したい曲を入力してください'
      />
      {/* 
          className の説明:
          bg-gray-700: 背景色を濃いグレーに設定
          w-1/3: 幅を親要素の1/3に設定
          p-2: パディングを2ユニット設定
          rounded-l-lg: 左側の角を大きく丸める
          focus:outline-none: フォーカス時のアウトラインを非表示に
        */}
      {/* 検索ボタンを表示します。
          クラス名を使用して、スタイルを適用しています。
          FontAwesomeIconコンポーネントを使用して、検索アイコンを表示しています。 */}
      <button
        onClick={props.onSubmit}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg'
      >
        {/* 
          className の説明:
          bg-blue-500: 背景色を青に設定
          hover:bg-blue-700: ホバー時に濃い青に変更
          text-white: テキスト色を白に設定
          font-bold: フォントを太字に設定
          py-2: 上下のパディングを2ユニット設定
          px-4: 左右のパディングを4ユニット設定
          rounded-r-lg: 右側の角を大きく丸める
        */}
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
