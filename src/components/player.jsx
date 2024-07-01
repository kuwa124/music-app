// FontAwesomeのアイコンをインポート
// faPlayCircle: 再生ボタンのアイコン
// faStopCircle: 停止ボタンのアイコン
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';

// FontAwesomeIconコンポーネントをインポート
// このコンポーネントは、FontAwesomeのアイコンをReactで使用するためのものです
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Playerコンポーネントを定義します。このコンポーネントは曲の情報を表示し、再生/停止ボタンを提供します。
export function Player(props) {
  // フッターコンポーネントを返します。フッターには曲の情報と再生/停止ボタンが表示されます。
  return (
    <footer className='fixed bottom-0 w-full bg-gray-800 p-5'>
      {/* 
        className の説明:
        fixed: 要素を固定位置に配置
        bottom-0: 下端に配置
        w-full: 幅を100%に設定
        bg-gray-800: 背景色を濃いグレーに設定
        p-5: すべての方向にパディングを5ユニット設定
      */}
      {/* グリッドレイアウトを使用して、3つのカラムを作成します。 */}
      <div className='grid grid-cols-3'>
        {/* 
          className の説明:
          grid: グリッドレイアウトを適用
          grid-cols-3: 3列のグリッドを作成
        */}
        {/* 曲の情報を表示するカラム */}
        <div className='flex items-center'>
          {/* 
            className の説明:
            flex: フレックスボックスレイアウトを適用
            items-center: アイテムを垂直方向の中央に配置
          */}
          {/* アルバムのサムネイル画像を表示します。 */}
          <img
            // アルバムの画像を表示
            src={props.song.album.images[0].url}
            // 代替テキストとCSSクラスを設定
            alt='thumbnail'
            className='rounded-full mr-3 h-[50px] w-[50px]'
          />
          {/* 
              className の説明:
              rounded-full: 完全な円形に丸める
              mr-3: 右マージンを3ユニット設定
              h-[50px]: 高さを50ピクセルに設定
              w-[50px]: 幅を50ピクセルに設定
            */}
          {/* 曲名とアーティスト名を表示します。 */}
          <div>
            <p className='text-sm font-semibold'>{props.song.name}</p>
            {/* 
              className の説明:
              text-sm: 小さめのテキストサイズを設定
              font-semibold: フォントの太さをやや太めに設定
            */}
            <p className='text-xs text-gray-400'>
              {props.song.artists[0].name}
            </p>
            {/* 
              className の説明:
              text-xs: より小さいテキストサイズを設定
              text-gray-400: テキストの色を薄いグレーに設定
            */}
          </div>
        </div>
        {/* 再生/停止ボタンを表示するカラム */}
        <div className='flex items-center justify-center'>
          {/* 
            className の説明:
            flex: フレックスボックスレイアウトを適用
            items-center: アイテムを垂直方向の中央に配置
            justify-center: アイテムを水平方向の中央に配置
          */}
          {/* FontAwesomeIconコンポーネントを使用して、再生/停止ボタンを表示します。
              ボタンのクリックイベントは、親コンポーネントから渡されたonButtonClickプロパティにバインドされます。
              アイコンは、親コンポーネントから渡されたisPlayプロパーティに基づいて切り替わります。
              曲がプレビュー可能な場合はボタンがクリック可能になり、そうでない場合は非アクティブになります。 */}
          <FontAwesomeIcon
            onClick={props.onButtonClick}
            icon={props.isPlay ? faStopCircle : faPlayCircle}
            className={`text-white text-3xl mx-2 h-[40px] w-[40px] 
            ${
              props.song.preview_url != null
                ? 'cursor-pointer'
                : 'opacity-50 pointer-events-none'
            }`}
          />
          {/* 
                className の説明:
                text-white: テキスト（アイコン）の色を白に設定
                text-3xl: 大きめのテキスト（アイコン）サイズを設定
                mx-2: 左右のマージンを2ユニット設定
                h-[40px]: 高さを40ピクセルに設定
                w-[40px]: 幅を40ピクセルに設定
                cursor-pointer: マウスカーソルをポインターに変更（プレビュー可能な場合）
                opacity-50: 不透明度を50%に設定（プレビュー不可能な場合）
                pointer-events-none: マウスイベントを無効化（プレビュー不可能な場合）
              */}
        </div>
      </div>
    </footer>
  );
}
