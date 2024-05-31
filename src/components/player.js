// FontAwesomeのアイコンをインポート
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
// FontAwesomeIconコンポーネントをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Playerコンポーネントを定義します。このコンポーネントは曲の情報を表示し、再生/停止ボタンを提供します。
export function Player(props) {
  // フッターコンポーネントを返します。フッターには曲の情報と再生/停止ボタンが表示されます。
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 p-5">
      {/* グリッドレイアウトを使用して、3つのカラムを作成します。 */}
      <div className="grid grid-cols-3">
        {/* 曲の情報を表示するカラム */}
        <div className="flex items-center">
          {/* アルバムのサムネイル画像を表示します。 */}
          <img
            // アルバムの画像を表示
            src={
              props.song.album.images[0].url
            }
            // 代替テキストとCSSクラスを設定
            alt="thumbnail"
            className="rounded-full mr-3 h-[50px] w-[50px]"
          />
          {/* 曲名とアーティスト名を表示します。 */}
          <div>
            <p className="text-sm font-semibold">{props.song.name}</p>
            <p className="text-xs text-gray-400">{props.song.artists[0].name}</p>
          </div>
        </div>
        {/* 再生/停止ボタンを表示するカラム */}
        <div className="flex items-center justify-center">
          {/* FontAwesomeIconコンポーネントを使用して、再生/停止ボタンを表示します。
              ボタンのクリックイベントは、親コンポーネントから渡されたonButtonClickプロパティにバインドされます。
              アイコンは、親コンポーネントから渡されたisPlayプロパーティに基づいて切り替わります。
              曲がプレビュー可能な場合はボタンがクリック可能になり、そうでない場合は非アクティブになります。 */}
          <FontAwesomeIcon
            onClick={props.onButtonClick}
            icon={props.isPlay ? faStopCircle : faPlayCircle}
            className={`text-white text-3xl mx-2 h-[40px] w-[40px] 
            ${props.song.preview_url != null
                ? "cursor-pointer"
                : "opacity-50 pointer-events-none"
              }`}
          />
        </div>
      </div>
    </footer>
  );
}