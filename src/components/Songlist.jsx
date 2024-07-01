// @fortawesome/free-solid-svg-iconsからfaSpinnerアイコンをインポートする
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// @fortawesome/react-fontawesomeからFontAwesomeIconコンポーネントをインポートする
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// SongListコンポーネントを定義する
export function SongList(props) {
  // propsのisLoadingプロパティがtrueの場合、ローディングスピナーを表示する
  if (props.isLoading) {
    // 画面全体に中央配置されたフレックスボックス内にスピナーを表示
    return (
      <div className='inset-0 flex justify-center items-center'>
        {/* 
          className の説明:
          inset-0: 要素を親要素の端に合わせて配置
          flex: フレックスボックスとして表示
          justify-center: 主軸（横方向）に中央揃え
          items-center: 交差軸（縦方向）に中央揃え
        */}
        {/* FontAwesomeIconを使用してスピナーアイコンを表示 */}
        <FontAwesomeIcon icon={faSpinner} spin size='3x' />
      </div>
    );
  }

  // 曲のリストを表示する
  return (
    // グリッドレイアウトを使用して曲アイテムを配置
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8'>
      {/* 
        className の説明:
        grid: グリッドレイアウトを適用
        grid-cols-3: デフォルトで3列のグリッド
        md:grid-cols-4: 中サイズ画面で4列のグリッド
        lg:grid-cols-5: 大サイズ画面で5列のグリッド
        gap-8: グリッドアイテム間に8ユニットの間隔を設定
      */}
      {/* propsから受け取った曲の配列をマップして各曲のアイテムを生成 */}
      {props.songs.map((song) => {
        // 各曲アイテムを返す
        return (
          // クリック可能な曲アイテムのコンテナ
          <div
            onClick={() => props.onSongSelected(song)}
            key={song.id}
            className='flex-none cursor-pointer'
          >
            {/* 
              className の説明:
              flex-none: フレックスアイテムのサイズを固定
              cursor-pointer: マウスカーソルをポインターに変更
            */}
            {/* 曲のアルバムカバー画像 */}
            <img
              alt='thumbnail'
              src={song.album.images[0].url}
              className='mb-2 rounded'
            />
            {/* 
                className の説明:
                mb-2: 下マージンを2ユニット設定
                rounded: 角を丸くする
              */}
            {/* 曲名 */}
            <h3 className='text-lg font-semibold'>{song.name}</h3>
            {/* 
              className の説明:
              text-lg: 大きめのテキストサイズを設定
              font-semibold: フォントの太さをやや太めに設定
            */}
            {/* アーティスト名 */}
            <p className='text-gray-400'>By {song.artists[0].name}</p>
            {/* 
              className の説明:
              text-gray-400: テキストの色を薄いグレーに設定
            */}
          </div>
        );
      })}
    </div>
  );
}
