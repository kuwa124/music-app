export function Pagination(props) {
  // Paginationコンポーネントの定義
  return (
    // ページネーションを表示するdiv要素
    <div
      className={`
            mt-8 // 上マージンを2rem（32px）に設定
            flex // 子要素を水平に並べるflexコンテナに設定
            justify-center // 子要素を中央に配置するflexアイテムに設定
        `}>
      {' '}
      {/* 前のページに移動するためのボタン */}
      <button
        // 前のページに移動するための関数を呼び出すonClickイベント
        onClick={props.onPrev}
        // ボタンのスタイル設定（未来的・無効時のスタイルも含む）
        className={`
          bg-gray-700 // 背景色をグレー（#4B5563）に設定
          hover:bg-gray-600 // ホバー時の背景色をグレー（#52525B）に設定
          text-white // テキストの色を白に設定
          font-bold // テキストを太字に設定
          py-2 // 上下のパディングを0.5rem（8px）に設定
          px-4 // 左右のパディングを1rem（16px）に設定
          rounded // 角を丸くする
          disabled:opacity-50 // 無効化された場合の不透明度を50%に設定
          disabled:cursor-not-allowed // 無効化された場合のカーソルをnot-allowedに設定
        `}
      >
        Previous
      </button>
      {/* 次のページに移動するためのボタン */}
      <button
        // 次のページに移動するための関数を呼び出すonClickイベント
        onClick={props.onNext}
        // ボタンのスタイル設定（未来的・無効時のスタイルも含む）
        className={`
          bg-gray-700 // 背景色をグレー（#4B5563）に設定
          hover:bg-gray-600 // ホバー時の背景色をグレー（#52525B）に設定
          text-white // テキストの色を白に設定
          font-bold // テキストを太字に設定
          py-2 // 上下のパディングを0.5rem（8px）に設定
          px-4 // 左右のパディングを1rem（16px）に設定
          rounded // 角を丸くする
          disabled:opacity-50 // 無効化された場合の不透明度を50%に設定
          disabled:cursor-not-allowed // 無効化された場合のカーソルをnot-allowedに設定
          ml-4 // 左マージンを1rem（16px）に設定
        `}
      >
        Next
      </button>
    </div>
  );
}
