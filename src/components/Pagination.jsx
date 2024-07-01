// 共通のボタンスタイルを定数として定義
const BUTTON_STYLE =
  'w-24 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed';
// w-24: 幅を6rem（96px）に固定
// bg-gray-700: 背景色をグレー（#374151）に設定
// hover:bg-gray-600: ホバー時の背景色をグレー（#4B5563）に設定
// text-white: テキストの色を白に設定
// font-bold: テキストを太字に設定
// py-2: 上下のパディングを0.5rem（8px）に設定
// px-4: 左右のパディングを1rem（16px）に設定
// rounded: 角を丸くする
// disabled:opacity-50: 無効時の不透明度を50%に設定
// disabled:cursor-not-allowed: 無効時のカーソルをnot-allowedに設定

export function Pagination(props) {
  // Paginationコンポーネントの定義
  return (
    // ページネーションを表示するdiv要素
    <div
      // 上マージンを2rem（32px）に設定、子要素を水平に並べるflexコンテナに設定、子要素を中央に配置
      className='mt-8 flex justify-center'
    >
      {/* 前のページに移動するためのボタン */}
      <button
        // propsのonPrevがnullの場合、ボタンを無効化
        disabled={props.onPrev == null}
        // クリック時に前のページに移動する関数を呼び出す
        onClick={props.onPrev}
        // 共通のボタンスタイルを適用
        className={BUTTON_STYLE}
      >
        Previous
      </button>
      {/* 次のページに移動するためのボタン */}
      <button
        // propsのonNextがnullの場合、ボタンを無効化
        disabled={props.onNext == null}
        // クリック時に次のページに移動する関数を呼び出す
        onClick={props.onNext}
        // 共通のボタンスタイルに加えて左マージンを追加
        className={`${BUTTON_STYLE} ml-4`}
      >
        Next
      </button>
    </div>
  );
}
