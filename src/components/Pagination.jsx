export function Pagination(props) {
  // Paginationコンポーネントの定義
  return (
    // ページネーションを表示するdiv要素
    <div
      // 上マージンを2rem（32px）に設定、子要素を水平に並べるflexコンテナに設定、子要素を中央に配置するflexアイテムに設定
      className='mt-8 flex justify-center'
    >
      {/* 前のページに移動するためのボタン */}
      <button
        disabled={props.onPrev == null}
        // 前のページに移動するための関数を呼び出すonClickイベント
        onClick={props.onPrev}
        // ボタンのスタイル設定（未来的・無効時のスタイルも含む）
        // 背景色をグレー（#4B5563）に設定、ホバー時の背景色をグレー（#52525B）に設定
        // テキストの色を白に設定、テキストを太字に設定
        // 上下のパディングを0.5rem（8px）に設定、左右のパディングを1rem（16px）に設定
        // 角を丸くする、無効化された場合の不透明度を50%に設定
        // 無効化された場合のカーソルをnot-allowedに設定
        className='bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Previous
      </button>
      {/* 次のページに移動するためのボタン */}
      <button
        disabled={props.onNext == null}
        // 次のページに移動するための関数を呼び出すonClickイベント
        onClick={props.onNext}
        // ボタンのスタイル設定（未来的・無効時のスタイルも含む）
        // 背景色をグレー（#4B5563）に設定、ホバー時の背景色をグレー（#52525B）に設定
        // テキストの色を白に設定、テキストを太字に設定
        // 上下のパディングを0.5rem（8px）に設定、左右のパディングを1rem（16px）に設定
        // 角を丸くする、無効化された場合の不透明度を50%に設定
        // 無効化された場合のカーソルをnot-allowedに設定
        // 左マージンを1rem（16px）に設定
        className='bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4'
      >
        Next
      </button>
    </div>
  );
}
